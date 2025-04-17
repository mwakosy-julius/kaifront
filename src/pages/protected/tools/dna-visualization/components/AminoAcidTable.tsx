import React from 'react';

interface AminoAcidTableProps {
  tableHtml: string;
  counts: { [key: string]: number };
}

const AminoAcidTable: React.FC<AminoAcidTableProps> = ({ tableHtml, counts }) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Amino Acid Counts</h2>
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: tableHtml }}
      />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          const csv = [
            'Amino Acid,Count',
            ...Object.entries(counts).map(([aa, count]) => `${aa},${count}`),
          ].join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'amino_acid_counts.csv';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download CSV
      </button>
    </div>
  );
};

export default AminoAcidTable;