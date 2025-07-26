import React, { useRef, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Taxon } from "@/lib/services/tools";

interface TaxonomyChartProps {
  taxa: Taxon[];
}

const TaxonomyChart: React.FC<TaxonomyChartProps> = ({ taxa }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate a color for each taxon
  const getColor = (index: number): string => {
    const colors = [
      "#3b82f6", // blue
      "#10b981", // emerald
      "#f59e0b", // amber
      "#6366f1", // indigo
      "#ec4899", // pink
      "#8b5cf6", // violet
      "#f43f5e", // rose
      "#14b8a6", // teal
      "#a855f7", // purple
      "#06b6d4", // cyan
      "#ef4444", // red
      "#84cc16", // lime
      "#6b7280", // gray
      "#f97316", // orange
      "#0ea5e9", // sky
    ];
    return colors[index % colors.length];
  };

  // Calculate chartData with useMemo to prevent unnecessary re-renders
  const chartData = useMemo(() => {
    // Sort taxa by abundance descending
    const sortedTaxa = [...taxa].sort((a, b) => b.abundance - a.abundance);

    // Group small taxa into "Other" category
    const threshold = 2.0; // Taxa with less than 2% abundance go into "Other"
    const result: Taxon[] = [];
    let otherSum = 0;

    sortedTaxa.forEach((taxon) => {
      if (taxon.abundance >= threshold) {
        result.push(taxon);
      } else {
        otherSum += taxon.abundance;
      }
    });

    if (otherSum > 0) {
      result.push({ genus: "Other", abundance: otherSum });
    }

    return result;
  }, [taxa]);

  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 20; // Shift up to make room for legend
    const radius = Math.min(centerX, centerY) - 40;

    let startAngle = 0;
    const total = chartData.reduce((sum, item) => sum + item.abundance, 0);

    // Draw pie slices
    chartData.forEach((taxon, index) => {
      const sliceAngle = (2 * Math.PI * taxon.abundance) / total;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = getColor(index);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label for large slices
      if (taxon.abundance / total > 0.05) {
        const midAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(midAngle);
        const labelY = centerY + labelRadius * Math.sin(midAngle);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.round(taxon.abundance)}%`, labelX, labelY);
      }

      startAngle = endAngle;
    });

    // Draw title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Taxonomic Composition", centerX, 10);

    // Draw legend
    const legendX = 50;
    let legendY = canvas.height - 20 - chartData.length * 20;

    chartData.forEach((taxon, index) => {
      // Color box
      ctx.fillStyle = getColor(index);
      ctx.fillRect(legendX, legendY, 15, 15);
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(legendX, legendY, 15, 15);

      // Label
      ctx.fillStyle = "#000000";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${taxon.genus} (${taxon.abundance.toFixed(1)}%)`,
        legendX + 25,
        legendY + 7.5
      );

      legendY += 20;
    });
  }, [chartData]);

  const downloadChart = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "taxonomy_chart.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Taxonomic Composition</CardTitle>
        <CardDescription>
          Relative abundance of genera in your metagenomic sample
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 overflow-auto bg-white border rounded">
          <canvas ref={canvasRef} />
        </div>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={downloadChart}>
            <Download className="w-4 h-4 mr-2" />
            Download Chart
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            This chart shows the relative abundance of different genera
            identified in your metagenomic sample. Taxa with abundance below 2%
            are grouped as "Other".
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxonomyChart;
