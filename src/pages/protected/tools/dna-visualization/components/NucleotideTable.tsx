import React from 'react';

interface NucleotideTableProps {
  tableHtml: string;
  counts: { [key: string]: number };
}

const NucleotideTable: React.FC<NucleotideTableProps> = ({ tableHtml, counts }) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Nucleotide Counts</h2>
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: tableHtml }}
      />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          const csv = [
            'Nucleotide,Count',
            ...Object.entries(counts).map(([nuc, count]) => `${nuc},${count}`),
          ].join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'nucleotide_counts.csv';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download CSV
      </button>
    </div>
  );
};

export default NucleotideTable;