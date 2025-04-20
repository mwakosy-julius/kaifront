import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AlignmentHeatmapProps {
  alignment: string;
}

const AlignmentHeatmap: React.FC<AlignmentHeatmapProps> = ({ alignment }) => {
  const { sequences, ids } = useMemo(() => {
    const lines = alignment
      .split("\n")
      .filter((line) => line && !line.startsWith("CLUSTAL"));
    const seqObject: Record<string, string> = {};

    lines.forEach((line) => {
      const [id, seq] = line.split(/\s+/).filter(Boolean);
      if (id && seq) {
        seqObject[id] = (seqObject[id] || "") + seq;
      }
    });

    return {
      sequences: Object.values(seqObject),
      ids: Object.keys(seqObject),
    };
  }, [alignment]);

  const conservationMap = useMemo(() => {
    if (sequences.length === 0) return [];

    const maxLength = Math.max(...sequences.map((s) => s.length));
    const result: number[] = Array(maxLength).fill(0);

    // Calculate conservation score for each position
    for (let pos = 0; pos < maxLength; pos++) {
      const characters = new Map<string, number>();
      let total = 0;

      for (const seq of sequences) {
        if (pos < seq.length) {
          const char = seq[pos];
          characters.set(char, (characters.get(char) || 0) + 1);
          total++;
        }
      }

      // Calculate percentage of most common character at this position
      let maxCount = 0;
      for (const count of characters.values()) {
        maxCount = Math.max(maxCount, count);
      }

      result[pos] = Math.round((maxCount / total) * 100);
    }

    return result;
  }, [sequences]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Function to color code the cells
  const getColor = (value: number): string => {
    // Color gradient from yellow (low conservation) to red (high conservation)
    if (value < 33) return "#fef9c3"; // Light yellow
    if (value < 66) return "#fbbf24"; // Medium amber
    if (value < 100) return "#ef4444"; // Red
    return "#b91c1c"; // Dark red
  };

  // Draw the canvas when component mounts
  React.useEffect(() => {
    if (
      !canvasRef.current ||
      sequences.length === 0 ||
      conservationMap.length === 0
    )
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxLength = conservationMap.length;
    const cellSize = Math.min(20, Math.max(5, Math.floor(800 / maxLength)));
    const cellSpacing = 1;

    // Set canvas size based on data
    canvas.width = (cellSize + cellSpacing) * maxLength + 50; // Extra space for labels
    canvas.height = (cellSize + cellSpacing) * sequences.length + 50; // Extra space for position numbers

    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sequence labels
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    ids.forEach((id, i) => {
      ctx.fillText(
        id.substring(0, 8) + (id.length > 8 ? "..." : ""),
        45,
        i * (cellSize + cellSpacing) + 25 + cellSize / 2
      );
    });

    // Draw position numbers (every 10 positions)
    ctx.textAlign = "center";
    for (let i = 0; i < maxLength; i += 10) {
      ctx.fillText(
        (i + 1).toString(),
        i * (cellSize + cellSpacing) + 50 + cellSize / 2,
        15
      );
    }

    // Draw the heatmap cells
    sequences.forEach((seq, row) => {
      for (let col = 0; col < seq.length; col++) {
        const char = seq[col];
        const x = col * (cellSize + cellSpacing) + 50;
        const y = row * (cellSize + cellSpacing) + 25;

        // Fill cell based on conservation value
        ctx.fillStyle = getColor(conservationMap[col]);
        ctx.fillRect(x, y, cellSize, cellSize);

        // Draw character
        ctx.fillStyle = "black";
        ctx.font = `${cellSize * 0.7}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(char, x + cellSize / 2, y + cellSize * 0.75);
      }
    });

    // Draw legend
    const legendX = 50;
    const legendY = (cellSize + cellSpacing) * sequences.length + 35;
    const legendWidth = 150;
    const legendHeight = 15;

    // Draw gradient
    const gradient = ctx.createLinearGradient(
      legendX,
      0,
      legendX + legendWidth,
      0
    );
    gradient.addColorStop(0, "#fef9c3");
    gradient.addColorStop(0.33, "#fbbf24");
    gradient.addColorStop(0.66, "#ef4444");
    gradient.addColorStop(1, "#b91c1c");

    ctx.fillStyle = gradient;
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight);

    // Draw legend labels
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Low", legendX, legendY + 25);
    ctx.fillText("Conservation", legendX + legendWidth / 2, legendY + 25);
    ctx.fillText("High", legendX + legendWidth, legendY + 25);
  }, [sequences, conservationMap, ids]);

  // Function to download the canvas as PNG
  const downloadCanvas = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "alignment_heatmap.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (sequences.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Conservation Heatmap</CardTitle>
        <CardDescription>
          Visualization of sequence conservation across alignment positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-auto border rounded p-4 bg-white">
          <canvas ref={canvasRef} />
        </div>
        <Button variant="outline" size="sm" onClick={downloadCanvas}>
          <Download className="w-4 h-4 mr-2" />
          Download Heatmap
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>
            This heatmap shows conservation levels across alignment positions.
            Redder colors indicate higher conservation (more similar residues).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlignmentHeatmap;
