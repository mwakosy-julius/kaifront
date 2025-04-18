import React from 'react';

interface SequenceInputProps {
  sequences: string;
  setSequences: (seq: string) => void;
  seqType: string;
  setSeqType: (type: string) => void;
  onSubmit: () => void;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequences,
  setSequences,
  seqType,
  setSeqType,
  onSubmit,
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setSequences(text.trim());
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Input Sequences</h2>
      <textarea
        className="w-full h-32 p-4 bg-gray-900 text-white rounded-lg border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Enter FASTA sequences (e.g., >Seq1\nATGCCATGCTAG\n>Seq2\nATGCCATGCTAA)"
        value={sequences}
        onChange={(e) => setSequences(e.target.value)}
      />
      <div className="mt-4">
        <label className="text-white mr-4">Sequence Type:</label>
        <select
          className="p-2 bg-gray-900 text-white rounded-lg border border-cyan-500"
          value={seqType}
          onChange={(e) => setSeqType(e.target.value)}
        >
          <option value="dna">DNA</option>
          <option value="protein">Protein</option>
        </select>
      </div>
      <input
        type="file"
        accept=".fasta,.txt"
        className="mt-4 text-white"
        onChange={handleFileUpload}
      />
      <button
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={onSubmit}
        disabled={!sequences.trim()}
      >
        Align Sequences
      </button>
    </div>
  );
};

export default SequenceInput;