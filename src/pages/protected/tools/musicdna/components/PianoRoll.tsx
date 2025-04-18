import React, { useEffect } from 'react';
import Plotly from 'plotly.js';

interface PianoRollProps {
  melody: string[];
}

const PianoRoll: React.FC<PianoRollProps> = ({ melody }) => {
  useEffect(() => {
    const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const z = noteOrder.map(() => Array(melody.length).fill(0));
    melody.forEach((note, i) => {
      const noteIndex = noteOrder.indexOf(note);
      if (noteIndex !== -1) z[noteIndex][i] = 1;
    });

    Plotly.newPlot('piano-roll', [
      {
        z,
        type: 'heatmap',
        colorscale: 'Viridis',
        showscale: false,
      },
    ], {
      title: { text: 'Piano Roll', font: { color: 'white' } },
      xaxis: { title: 'Time', color: 'white' },
      yaxis: { title: 'Note', tickvals: [...Array(noteOrder.length).keys()], ticktext: noteOrder, color: 'white' },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { color: 'white' },
    });
  }, [melody]);

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Piano Roll Visualization</h2>
      <div id="piano-roll" />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          Plotly.downloadImage('piano-roll', { format: 'png', filename: 'piano_roll' });
        }}
      >
        Export PNG
      </button>
    </div>
  );
};

export default PianoRoll;