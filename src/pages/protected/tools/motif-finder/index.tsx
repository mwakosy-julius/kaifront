import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import FastaInput from './components/FastaInput';
import MotifResults from './components/MotifResults';

// TypeScript interfaces
interface MotifRequest {
  fasta: string;
}

interface MotifPosition {
  sequence: string;
  position: number;
  motif: string;
}

interface MotifResponse {
  consensus: string;
  score: number;
  motif_length: number;
  positions: MotifPosition[];
}

const MotifFinder: React.FC = () => {
  const [fastaInput, setFastaInput] = useState<string>(
    '>seq1\nATCGATGCTAGCTAGC\n>seq2\nATGCTAGCTAGCATCG\n>seq3\nGCTAGCTAGCATCGAT'
  );
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<MotifResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindMotifs = async () => {
    setError('');
    setResponse(null);
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

    const request: MotifRequest = { fasta: inputData };

    try {
      const res = await axios.post<MotifResponse>(
        'http://localhost:8000/motif-finder',
        request,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setResponse(res.data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || 'Failed to find motifs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white flex flex-col items-center p-6">
      {/* DNA Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="animate-pulse w-full h-full bg-[url('https://www.svgrepo.com/show/305146/dna.svg')] bg-center bg-no-repeat bg-contain"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500"
      >
        Motif Finder
      </motion.h1>

      <FastaInput
        fasta={fastaInput}
        setFasta={setFastaInput}
        file={file}
        setFile={setFile}
        disabled={loading}
      />

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        disabled={loading || (!fastaInput && !file)}
        onClick={handleFindMotifs}
        className={`mt-6 w-full max-w-3xl py-3 rounded-lg text-lg font-semibold transition-all ${
          loading || (!fastaInput && !file)
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-cyan-600 hover:bg-cyan-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
            </svg>
            Finding Motifs...
          </span>
        ) : (
          'Find Motifs'
        )}
      </motion.button>

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
        {response && <MotifResults response={response} fastaInput={fastaInput} />}
      </AnimatePresence>

      <p className="mt-8 text-gray-400 text-center max-w-3xl text-sm">
        Enter or upload FASTA sequences to discover conserved motifs with automatic length detection, visualized in vibrant nucleotide colors.
      </p>
    </div>
  );
};

export default MotifFinder;