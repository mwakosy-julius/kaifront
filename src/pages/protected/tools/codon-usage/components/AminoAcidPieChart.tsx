import React, { useEffect } from "react";
import Plotly from "plotly.js";

interface CodonData {
  amino_acid: string;
  relative_usage: number;
  percentage: number;
  count: number;
}

interface CodonUsage {
  [codon: string]: CodonData;
}

interface AminoAcidPieChartProps {
  codonUsage: CodonUsage;
}

const AminoAcidPieChart: React.FC<AminoAcidPieChartProps> = ({
  codonUsage,
}) => {
  const aaCounts = Object.entries(codonUsage).reduce((acc, [, data]) => {
    acc[data.amino_acid] = (acc[data.amino_acid] || 0) + data.count;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(aaCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  useEffect(() => {
    Plotly.newPlot(
      "aa-pie-chart",
      [
        {
          labels: data.map(([aa]) => aa),
          values: data.map(([, count]) => count),
          type: "pie",
          marker: {
            colors: [
              "#00FF00",
              "#FF0000",
              "#0000FF",
              "#FFFF00",
              "#22D3EE",
              "#EC4899",
              "#10B981",
              "#F59E0B",
            ],
          },
        },
      ],
      {
        title: { text: "Amino Acid Distribution", font: { color: "white" } },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        font: { color: "white" },
      }
    );
  }, [codonUsage, data]);

  return (
    <div className="p-6 mt-6 bg-gray-800 rounded-lg shadow-lg bg-opacity-70 backdrop-blur-md">
      <h2 className="mb-4 text-2xl font-bold text-cyan-300">
        Amino Acid Distribution
      </h2>
      <div id="aa-pie-chart" />
      <button
        className="px-6 py-2 mt-4 transition rounded-lg shadow-lg bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-500/50"
        onClick={() => {
          Plotly.downloadImage("aa-pie-chart", {
            format: "png",
            filename: "amino_acid_distribution",
            width: 800,
            height: 600,
          });
        }}
      >
        Download PNG
      </button>
    </div>
  );
};

export default AminoAcidPieChart;
