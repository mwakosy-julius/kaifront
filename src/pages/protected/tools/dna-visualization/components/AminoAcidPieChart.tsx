import React, { useEffect } from 'react';
import Plotly from 'plotly.js';

interface AminoAcidPieChartProps {
  counts: { [key: string]: number };
}

const AminoAcidPieChart: React.FC<AminoAcidPieChartProps> = ({ counts }) => {
  useEffect(() => {
    const data = Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    Plotly.newPlot('amino-acid-pie-chart', [
      {
        labels: data.map(([aa]) => aa),
        values: data.map(([_, count]) => count),
        type: 'pie',
        marker: {
          colors: ['#00FF00', '#FF0000', '#0000FF', '#FFFF00', '#22D3EE', '#EC4899', '#10B981', '#F59E0B'],
        },
      },
    ], {
      title: { text: 'Amino Acid Distribution', font: { color: 'white' } },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { color: 'white' },
    });
  }, [counts]);

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Amino Acid Distribution</h2>
      <div id="amino-acid-pie-chart" />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          Plotly.downloadImage('amino-acid-pie-chart', { format: 'png', filename: 'amino_acid_distribution' });
        }}
      >
        Download PNG
      </button>
    </div>
  );
};

export default AminoAcidPieChart;