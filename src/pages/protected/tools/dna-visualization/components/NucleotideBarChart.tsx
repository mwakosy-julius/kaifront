import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { NucleotideDataPoint } from "@/lib/services/tools/dna_visualization";

interface NucleotideBarChartProps {
  data: NucleotideDataPoint[];
}

const NUCLEOTIDE_COLORS = {
  A: "#4ade80", // green
  T: "#f87171", // red
  G: "#60a5fa", // blue
  C: "#facc15", // yellow
};

const NucleotideBarChart: React.FC<NucleotideBarChartProps> = ({ data }) => {
  // Function to save chart as SVG
  const downloadChart = () => {
    const svgElement = document.querySelector("#nucleotide-chart svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nucleotide_distribution.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-sm border rounded shadow-md bg-background">
          <p className="font-medium">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
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
        <CardTitle className="text-base">Nucleotide Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div id="nucleotide-chart" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" key="name">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={NUCLEOTIDE_COLORS[entry.name] || "#999"}
                  />
                ))}
              </Bar>
            </BarChart>
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

export default NucleotideBarChart;
