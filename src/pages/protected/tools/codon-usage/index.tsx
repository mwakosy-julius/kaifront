import React, { useState } from 'react';
import SequenceInput from './components/SequenceInput';
import CodonTable from './components/CodonTable';
import CodonBarChart from './components/CodonBarChart';
import AminoAcidPieChart from './components/AminoAcidPieChart';
import './App.css';

interface CodonData {
  amino_acid: string;
  relative_usage: number;
  percentage: number;
  count: number;
}

interface CodonUsage {
  [codon: string]: CodonData;
}

interface ApiResponse {
  codon_usage: CodonUsage;
  table: string;
}

const App: React.FC = () => {
  const [sequence, setSequence] = useState('');
  const [codonUsage, setCodonUsage] = useState<CodonUsage>({});
  const [tableHtml, setTableHtml] = useState('');
  const [aminoAcidFilter, setAminoAcidFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/codon_usage/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence }),
      });
      if (!response.ok) throw new Error('Failed to fetch codon usage');
      const data: ApiResponse = await response.json();
      setCodonUsage(data.codon_usage);
      setTableHtml(data.table);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-8">
        CodonCraft
      </h1>
      <SequenceInput sequence={sequence} setSequence={setSequence} onSubmit={handleSubmit} />
      {loading && <p className="text-center text-cyan-300 mt-4">Analyzing...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
      {Object.keys(codonUsage).length > 0 && (
        <>
          <CodonTable
            tableHtml={tableHtml}
            codonUsage={codonUsage}
            aminoAcidFilter={aminoAcidFilter}
            setAminoAcidFilter={setAminoAcidFilter}
          />
          <CodonBarChart codonUsage={codonUsage} />
          <AminoAcidPieChart codonUsage={codonUsage} />
        </>
      )}
    </div>
  );
};

export default App;