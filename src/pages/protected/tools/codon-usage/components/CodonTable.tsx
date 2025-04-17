import React from 'react';

interface CodonData {
  amino_acid: string;
  relative_usage: number;
  percentage: number;
  count: number;
}

interface CodonUsage {
  [codon: string]: CodonData;
}

interface CodonTableProps {
  tableHtml: string;
  codonUsage: CodonUsage;
  aminoAcidFilter: string;
  setAminoAcidFilter: (filter: string) => void;
}

const CodonTable: React.FC<CodonTableProps> = ({
  tableHtml,
  codonUsage,
  aminoAcidFilter,
  setAminoAcidFilter,
}) => {
  const aminoAcids = Array.from(new Set(Object.values(codonUsage).map(d => d.amino_acid))).sort();

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Codon Usage Table</h2>
      <select
        className="mb-4 p-2 bg-gray-900 text-white rounded-lg border border-cyan-500"
        value={aminoAcidFilter}
        onChange={(e) => setAminoAcidFilter(e.target.value)}
      >
        <option value="">All Amino Acids</option>
        {aminoAcids.map(aa => (
          <option key={aa} value={aa}>{aa}</option>
        ))}
      </select>
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{
          __html: aminoAcidFilter
            ? `<table border="1" class="w-full text-center text-white"><tr>${Object.entries(codonUsage)
                .filter(([_, data]) => data.amino_acid === aminoAcidFilter)
                .map(([codon, data]) => (
                  `<td class="p-2">${codon}<br>${data.amino_acid}<br>${data.relative_usage.toFixed(2)}<br>${data.percentage.toFixed(1)}%<br>${data.count}</td>`
                )).join('')}</tr></table>`
            : tableHtml
        }}
      />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          const csv = [
            'Codon,Amino Acid,Relative Usage,Percentage,Count',
            ...Object.entries(codonUsage).map(([codon, data]) =>
              `${codon},${data.amino_acid},${data.relative_usage},${data.percentage},${data.count}`
            ),
          ].join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'codon_usage.csv';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download CSV
      </button>
    </div>
  );
};

export default CodonTable;