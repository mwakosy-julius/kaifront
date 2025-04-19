import React from "react";
import { Download } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// local imports
import { Button } from "@/components/ui/button";
import { AminoAcidDataPoint } from "@/lib/services/tools/dna_visualization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AminoAcidPieChartProps {
  data: AminoAcidDataPoint[];
}

const AMINO_ACID_COLORS = [
  "#4ade80", // green
  "#f87171", // red
  "#60a5fa", // blue
  "#facc15", // yellow
  "#a78bfa", // purple
  "#f472b6", // pink
  "#34d399", // emerald
  "#fb923c", // orange
  "#a3e635", // lime
  "#22d3ee", // cyan
  "#e879f9", // fuchsia
  "#2dd4bf", // teal
  "#fbbf24", // amber
  "#818cf8", // indigo
  "#f43f5e", // rose
  "#0ea5e9", // sky
  "#d946ef", // purple
  "#10b981", // emerald
  "#f97316", // orange
  "#84cc16", // lime
];

const AminoAcidPieChart: React.FC<AminoAcidPieChartProps> = ({ data }) => {
  // Sort data by count (descending) and filter out entries with count 0
  const sortedData = [...data]
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  // Function to save chart as SVG
  const downloadChart = () => {
    const svgElement = document.querySelector("#amino-acid-chart svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amino_acid_distribution.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-sm border rounded shadow-md bg-background">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-xs text-muted-foreground">{`${payload[0].payload.percentage.toFixed(
            1
          )}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Amino Acid Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div id="amino-acid-chart" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sortedData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {sortedData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={AMINO_ACID_COLORS[index % AMINO_ACID_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadChart}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
      </CardContent>
    </Card>
  );
};

export default AminoAcidPieChart;
