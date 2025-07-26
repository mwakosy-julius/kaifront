import { useEffect, useRef } from "react";
import Plotly from "plotly.js";
import { Taxon } from "@/lib/services/tools";

interface ResultChartProps {
  taxa: Taxon[];
}

const ResultChart: React.FC<ResultChartProps> = ({ taxa }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (taxa.length && chartRef.current) {
      const layout = {
        title: { text: "Taxonomic Profile", font: { color: "#D1D5DB" } },
        xaxis: { title: "Genus", tickangle: 45, color: "#D1D5DB" },
        yaxis: { title: "Abundance (%)", color: "#D1D5DB" },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        height: 400,
        margin: { b: 150 },
      };
      Plotly.newPlot(
        chartRef.current,
        [
          {
            x: taxa.map((t) => t.genus),
            y: taxa.map((t) => t.abundance),
            type: "bar",
            marker: {
              color: ["#06B6D4", "#EC4899", "#F59E0B", "#10B981", "#8B5CF6"],
            },
          },
        ],
        layout
      );
    }
  }, [taxa]);

  return <div ref={chartRef} className="fade-in" />;
};

export default ResultChart;
