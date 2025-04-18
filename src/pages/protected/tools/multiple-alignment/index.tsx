import React, { useState } from 'react';
import SequenceInput from './components/SequenceInput';
import AlignmentDisplay from './components/AlignmentDisplay';
import AlignmentHeatmap from './components/AlignmentHeatmap';
import './App.css';

interface AlignResponse {
  alignment: string;
}

const App: React.FC = () => {
  const [sequences, setSequences] = useState('');
  const [seqType, setSeqType] = useState('dna');
  const [alignment, setAlignment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setAlignment('');
    try {
      const response = await fetch('http://localhost:8000/align/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequences, seq_type: seqType }),
      });
      if (!response.ok) throw new Error('Failed to fetch alignment');
      const data: AlignResponse = await response.json();
      setAlignment(data.alignment);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-8">
        AlignCraft
      </h1>
      <SequenceInput
        sequences={sequences}
        setSequences={setSequences}
        seqType={seqType}
        setSeqType={setSeqType}
        onSubmit={handleSubmit}
      />
      {loading && <p className="text-center text-cyan-300 mt-4">Aligning...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
      {alignment && (
        <div className="space-y-6">
          <AlignmentDisplay alignment={alignment} />
          <AlignmentHeatmap alignment={alignment} />
        </div>
      )}
    </div>
  );
};

export default App;