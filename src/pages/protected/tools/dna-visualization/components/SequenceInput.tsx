import React from 'react';

interface SequenceInputProps {
  sequence: string;
  setSequence: (seq: string) => void;
  onSubmit: () => void;
}

const SequenceInput: React.FC<SequenceInputProps> = ({ sequence, setSequence, onSubmit }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const seq = text.split('\n').filter(line => !line.startsWith('>')).join('').trim();
        setSequence(seq.toUpperCase());
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Input DNA Sequence</h2>
      <textarea
        className="w-full h-32 p-4 bg-gray-900 text-white rounded-lg border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Enter DNA sequence (e.g., ATGCCATGCTAG...)"
        value={sequence}
        onChange={(e) => setSequence(e.target.value.toUpperCase())}
      />
      <input
        type="file"
        accept=".fasta,.txt"
        className="mt-4 text-white"
        onChange={handleFileUpload}
      />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={onSubmit}
        disabled={!sequence.trim()}
      >
        Analyze DNA
      </button>
    </div>
  );
};

export default SequenceInput;