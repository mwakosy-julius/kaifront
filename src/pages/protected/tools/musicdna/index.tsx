import React, { useState } from 'react';
import SequenceInput from './components/SequenceInput';
import MelodyPlayer from './components/MelodyPlayer';
import PianoRoll from './components/PianoRoll';
import './App.css';

interface MusicResponse {
  melody: string[];
}

const App: React.FC = () => {
  const [sequence, setSequence] = useState('');
  const [melody, setMelody] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setMelody([]);
    try {
      const response = await fetch('http://localhost:8000/musicdna/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence }),
      });
      if (!response.ok) throw new Error('Failed to generate melody');
      const data: MusicResponse = await response.json();
      setMelody(data.melody);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-8">
        MelodyCraft
      </h1>
      <SequenceInput sequence={sequence} setSequence={setSequence} onSubmit={handleSubmit} />
      {loading && <p className="text-center text-cyan-300 mt-4">Generating melody...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
      {melody.length > 0 && (
        <div className="space-y-6">
          <MelodyPlayer melody={melody} />
          <PianoRoll melody={melody} />
        </div>
      )}
    </div>
  );
};

export default App;