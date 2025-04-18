import React from 'react';

interface AlignmentDisplayProps {
  alignment: string;
}

const AlignmentDisplay: React.FC<AlignmentDisplayProps> = ({ alignment }) => {
  const parseAlignmentForCSV = () => {
    const lines = alignment.split('\n').filter(line => line && !line.startsWith('CLUSTAL'));
    const sequences = lines.reduce((acc, line) => {
      const [id, seq] = line.split(/\s+/).filter(Boolean);
      if (id && seq) acc[id] = (acc[id] || '') + seq;
      return acc;
    }, {} as Record<string, string>);
    return Object.entries(sequences).map(([id, seq]) => ({ id, sequence: seq }));
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Alignment Result</h2>
      <pre className="bg-gray-900 p-4 rounded-lg text-white font-mono text-sm overflow-x-auto">
        {alignment}
      </pre>
      <div className="mt-4 space-x-4">
        <button
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
          onClick={() => {
            const blob = new Blob([alignment], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'alignment.txt';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download Text
        </button>
        <button
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
          onClick={() => {
            const data = parseAlignmentForCSV();
            const csv = [
              'ID,Sequence',
              ...data.map(row => `${row.id},${row.sequence}`),
            ].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'alignment.csv';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default AlignmentDisplay;