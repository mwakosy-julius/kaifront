import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// TypeScript interfaces for API
interface ConsensusRequest {
  data: string;
}

interface ConsensusResponse {
  consensus: string;
}

const ConsensusMaker: React.FC = () => {
  const [fastaInput, setFastaInput] = useState<string>(
    '>seq1\nATCGATCGATCG\n>seq2\nATGGATCGATCG\n>seq3\nATCGATGGATCG'
  );
  const [file, setFile] = useState<File | null>(null);
  const [consensus, setConsensus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFastaInput(''); // Clear textarea if file is selected
    }
  };

  const handleGenerateConsensus = async () => {
    setError('');
    setConsensus('');
    setLoading(true);

    let inputData = fastaInput;
    if (file) {
      try {
        inputData = await file.text();
      } catch (err) {
        setError('Failed to read file');
        setLoading(false);
        return;
      }
    }

    const request: ConsensusRequest = { data: inputData };

    try {
      const response = await axios.post<ConsensusResponse>(
        'http://localhost:8000/consensus_maker',
        request,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setConsensus(response.data.consensus);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || 'Failed to generate consensus'
      );
    } finally {
      setLoading(false);
    }
  };

  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case 'A':
        return 'text-green-400';
      case 'T':
        return 'text-red-400';
      case 'C':
        return 'text-blue-400';
      case 'G':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white flex flex-col items-center p-6">
      {/* DNA Strand Background Animation */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse w-full h-full bg-[url('https://www.svgrepo.com/show/305146/dna.svg')] bg-center bg-no-repeat bg-contain"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500"
      >
        Consensus Sequence Generator
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-gray-800 bg-opacity-70 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
      >
        <label className="block text-lg font-semibold mb-4">
          Input FASTA Sequences
        </label>
        <textarea
          className="w-full h-48 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          value={fastaInput}
          onChange={(e) => {
            setFastaInput(e.target.value);
            setFile(null); // Clear file if textarea is edited
          }}
          placeholder="Enter multiple FASTA sequences (e.g., >seq1\nATCG...)"
          disabled={file !== null}
        />

        <div className="mt-4">
          <label className="block text-lg font-semibold mb-2">
            Or Upload FASTA File
          </label>
          <input
            type="file"
            accept=".fasta,.fa"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          disabled={loading || (!fastaInput && !file)}
          onClick={handleGenerateConsensus}
          className={`mt-6 w-full py-3 rounded-lg text-lg font-semibold transition-all ${
            loading || (!fastaInput && !file)
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-cyan-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Consensus'}
        </motion.button>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-600 bg-opacity-80 rounded-lg max-w-3xl w-full"
        >
          <strong>Error:</strong> {error}
        </motion.div>
      )}

      <AnimatePresence>
        {consensus && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 w-full max-w-3xl"
          >
            <h2 className="text-3xl font-semibold mb-4 text-center text-cyan-300">
              Consensus Sequence
            </h2>
            <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg backdrop-blur-md">
              <div className="font-mono text-lg flex flex-wrap">
                {consensus.split('').map((base, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`${getNucleotideColor(base)} px-1 hover:scale-125 transition-transform`}
                  >
                    {base}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-8 text-gray-400 text-center max-w-3xl">
        Enter or upload multiple DNA sequences in FASTA format to generate a consensus sequence, visualized with vibrant nucleotide colors.
      </p>
    </div>
  );
};

export default ConsensusMaker;