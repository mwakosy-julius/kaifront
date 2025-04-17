import React, { useState } from 'react';
import SequenceInput from './components/SequenceInput';
import NucleotideTable from './components/NucleotideTable';
import NucleotideBarChart from './components/NucleotideBarChart';
import AminoAcidTable from './components/AminoAcidTable';
import AminoAcidPieChart from './components/AminoAcidPieChart';
import './App.css';

interface ApiResponse {
  transcript: string;
  amino_acids: string;
  gc_content: number;
  dna_counts: { [key: string]: number };
  dna_table: string;
  dna_chart: string;
  amino_acid_counts: { [key: string]: number };
  amino_acid_chart: string;
}

const App: React.FC = () => {
  const [sequence, setSequence] = useState('');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/dna_visualization/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence }),
      });
      if (!response.ok) throw new Error('Failed to fetch DNA visualization');
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-8">
        DNAVision
      </h1>
      <SequenceInput sequence={sequence} setSequence={setSequence} onSubmit={handleSubmit} />
      {loading && <p className="text-center text-cyan-300 mt-4">Analyzing...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
      {data && (
        <div className="space-y-6">
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Results</h2>
            <p><strong>RNA Transcript:</strong> {data.transcript}</p>
            <p><strong>Amino Acids:</strong> {data.amino_acids}</p>
            <p><strong>GC Content:</strong> {(data.gc_content * 100).toFixed(1)}%</p>
          </div>
          <NucleotideTable tableHtml={data.dna_table} counts={data.dna_counts} />
          <NucleotideBarChart counts={data.dna_counts} />
          <AminoAcidTable tableHtml={data.amino_acid_chart} counts={data.amino_acid_counts} />
          <AminoAcidPieChart counts={data.amino_acid_counts} />
        </div>
      )}
    </div>
  );
};

export default App;import React, { useState } from 'react';
import SequenceInput from './components/SequenceInput';
import NucleotideTable from './components/NucleotideTable';
import NucleotideBarChart from './components/NucleotideBarChart';
import AminoAcidTable from './components/AminoAcidTable';
import AminoAcidPieChart from './components/AminoAcidPieChart';
import './App.css';

interface ApiResponse {
  transcript: string;
  amino_acids: string;
  gc_content: number;
  dna_counts: { [key: string]: number };
  dna_table: string;
  dna_chart: string;
  amino_acid_counts: { [key: string]: number };
  amino_acid_chart: string;
}

const App: React.FC = () => {
  const [sequence, setSequence] = useState('');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/dna_visualization/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence }),
      });
      if (!response.ok) throw new Error('Failed to fetch DNA visualization');
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-8">
        DNAVision
      </h1>
      <SequenceInput sequence={sequence} setSequence={setSequence} onSubmit={handleSubmit} />
      {loading && <p className="text-center text-cyan-300 mt-4">Analyzing...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
      {data && (
        <div className="space-y-6">
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">Results</h2>
            <p><strong>RNA Transcript:</strong> {data.transcript}</p>
            <p><strong>Amino Acids:</strong> {data.amino_acids}</p>
            <p><strong>GC Content:</strong> {(data.gc_content * 100).toFixed(1)}%</p>
          </div>
          <NucleotideTable tableHtml={data.dna_table} counts={data.dna_counts} />
          <NucleotideBarChart counts={data.dna_counts} />
          <AminoAcidTable tableHtml={data.amino_acid_chart} counts={data.amino_acid_counts} />
          <AminoAcidPieChart counts={data.amino_acid_counts} />
        </div>
      )}
    </div>
  );
};

export default App;