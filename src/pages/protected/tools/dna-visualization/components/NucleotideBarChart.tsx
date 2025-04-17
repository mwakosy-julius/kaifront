import React, { useEffect } from 'react';
import Plotly from 'plotly.js';

interface NucleotideBarChartProps {
  counts: { [key: string]: number };
}

const NucleotideBarChart: React.FC<NucleotideBarChartProps> = ({ counts }) => {
  useEffect(() => {
    const nucleotides = ['A', 'T', 'G', 'C'];
    const values = nucleotides.map(nuc => counts[nuc] || 0);

    Plotly.newPlot('nucleotide-bar-chart', [
      {
        x: nucleotides,
        y: values,
        type: 'bar',
        marker: { color: '#06B6D4' },
        text: values.map(v => v.toString()),
        textposition: 'auto',
      },
    ], {
      title: { text: 'Nucleotide Counts', font: { color: 'white' } },
      xaxis: { title: 'Nucleotide', color: 'white' },
      yaxis: { title: 'Count', color: 'white' },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { color: 'white' },
    });
  }, [counts]);

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Nucleotide Distribution</h2>
      <div id="nucleotide-bar-chart" />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          Plotly.downloadImage('nucleotide-bar-chart', { format: 'png', filename: 'nucleotide_distribution' });
        }}
      >
        Download PNG
      </button>
    </div>
  );
};

export default NucleotideBarChart;