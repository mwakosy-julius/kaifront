import React, { useEffect } from 'react';
import Plotly from 'plotly.js';

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
    .filter(([_, data]) => data.percentage > 0)
    .sort((a, b) => b[1].percentage - a[1].percentage);

  useEffect(() => {
    Plotly.newPlot('codon-bar-chart', [
      {
        x: data.map(([codon]) => codon),
        y: data.map(([_, d]) => d.percentage),
        type: 'bar',
        marker: { color: '#06B6D4' },
        text: data.map(([_, d]) => d.percentage.toFixed(1) + '%'),
        textposition: 'auto',
      },
    ], {
      title: { text: 'Codon Frequency (%)', font: { color: 'white' } },
      xaxis: { title: 'Codon', tickangle: 45, color: 'white' },
      yaxis: { title: 'Percentage (%)', color: 'white' },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { color: 'white' },
      margin: { b: 150 },
    });
  }, [codonUsage]);

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Codon Frequency</h2>
      <div id="codon-bar-chart" />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          Plotly.downloadImage('codon-bar-chart', { format: 'png', filename: 'codon_frequency' });
        }}
      >
        Download PNG
      </button>
    </div>
  );
};

export default CodonBarChart;