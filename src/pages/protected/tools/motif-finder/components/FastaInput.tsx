import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';

interface FastaInputProps {
  fasta: string;
  setFasta: Dispatch<SetStateAction<string>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  disabled: boolean;
}

const FastaInput: React.FC<FastaInputProps> = ({ fasta, setFasta, file, setFile, disabled }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFasta('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-lg backdrop-blur-md"
    >
      <label className="block text-lg font-semibold mb-3 text-gray-200">
        Input FASTA Sequences
      </label>
      <textarea
        className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50"
        value={fasta}
        onChange={(e) => {
          setFasta(e.target.value);
          setFile(null);
        }}
        placeholder="Enter multiple FASTA sequences (e.g., >seq1\nATCG...)"
        disabled={file !== null || disabled}
      />
      <div className="mt-4">
        <label className="block text-lg font-semibold mb-2 text-gray-200">
          Or Upload FASTA File
        </label>
        <input
          type="file"
          accept=".fasta,.fa"
          onChange={handleFileChange}
          disabled={disabled}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 disabled:file:bg-gray-600 disabled:cursor-not-allowed"
        />
      </div>
    </motion.div>
  );
};

export default FastaInput;