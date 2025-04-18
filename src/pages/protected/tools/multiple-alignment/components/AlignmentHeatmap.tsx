import React, { useEffect } from 'react';
import Plotly from 'plotly.js';

interface AlignmentHeatmapProps {
  alignment: string;
}

const AlignmentHeatmap: React.FC<AlignmentHeatmapProps> = ({ alignment }) => {
  const parseAlignment = () => {
    const lines = alignment.split('\n').filter(line => line && !line.startsWith('CLUSTAL'));
    const sequences = lines.reduce((acc, line) => {
      const [id, seq] = line.split(/\s+/).filter(Boolean);
      if (id && seq) acc[id] = (acc[id] || '') + seq;
      return acc;
    }, {} as Record<string, string>);
    return Object.values(sequences);
  };

  useEffect(() => {
    const sequences = parseAlignment();
    if (sequences.length === 0) return;

    const maxLength = Math.max(...sequences.map(s => s.length));
    const z = sequences.map(seq =>
      seq.padEnd(maxLength, '-').split('').map(char => {
        if (char === '-') return 0; // Gap
        return char.charCodeAt(0) % 10 + 1; // Color by character
      })
    );

    Plotly.newPlot('alignment-heatmap', [
      {
        z,
        type: 'heatmap',
        colorscale: 'Viridis',
        showscale: true,
      },
    ], {
      title: { text: 'Alignment Heatmap', font: { color: 'white' } },
      xaxis: { title: 'Position', color: 'white' },
      yaxis: { title: 'Sequence', tickvals: [...Array(sequences.length).keys()], ticktext: Object.keys(parseAlignment()), color: 'white' },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { color: 'white' },
    });
  }, [alignment]);

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Alignment Heatmap</h2>
      <div id="alignment-heatmap" />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          Plotly.downloadImage('alignment-heatmap', { format: 'png', filename: 'alignment_heatmap' });
        }}
      >
        Download PNG
      </button>
    </div>
  );
};

export default AlignmentHeatmap;