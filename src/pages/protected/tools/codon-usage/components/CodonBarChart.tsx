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

interface CodonBarChartProps {
  codonUsage: CodonUsage;
}

const CodonBarChart: React.FC<CodonBarChartProps> = ({ codonUsage }) => {
  const data = Object.entries(codonUsage)
    .filter(([, data]) => data.percentage > 0)
    .sort((a, b) => b[1].percentage - a[1].percentage);

  useEffect(() => {
    Plotly.newPlot(
      "codon-bar-chart",
      [
        {
          x: data.map(([codon]) => codon),
          y: data.map(([, d]) => d.percentage),
          type: "bar",
          marker: { color: "#06B6D4" },
          text: data.map(([, d]) => d.percentage.toFixed(1) + "%"),
          textposition: "auto",
        },
      ],
      {
        title: { text: "Codon Frequency (%)", font: { color: "white" } },
        xaxis: { title: "Codon", tickangle: 45, color: "white" },
        yaxis: { title: "Percentage (%)", color: "white" },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        font: { color: "white" },
        margin: { b: 150 },
      }
    );
  }, [codonUsage, data]);

  return (
    <div className="p-6 mt-6 bg-gray-800 rounded-lg shadow-lg bg-opacity-70 backdrop-blur-md">
      <h2 className="mb-4 text-2xl font-bold text-cyan-300">Codon Frequency</h2>
      <div id="codon-bar-chart" />
      <button
        className="px-6 py-2 mt-4 transition rounded-lg shadow-lg bg-cyan-600 hover:bg-cyan-700 hover:shadow-cyan-500/50"
        onClick={() => {
          Plotly.downloadImage("codon-bar-chart", {
            format: "png",
            filename: "codon_frequency",
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

export default CodonBarChart;
