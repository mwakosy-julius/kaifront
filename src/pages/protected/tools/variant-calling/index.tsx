import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// TypeScript interfaces matching FastAPI models
interface VariantCallRequest {
  ref_fasta: string;
  sample_fasta: string;
}

interface Variant {
  position: number;
  reference: string;
  variant: string;
  type: string;
}

interface VariantCallResponse {
  variants: Variant[];
}

const VariantCaller: React.FC = () => {
  const [refFasta, setRefFasta] = useState<string>(
    '>ref\nATCGATCGATCGATCG'
  );
  const [sampleFasta, setSampleFasta] = useState<string>(
    '>sample\nATGGATCGATCGATCG'
  );
  const [variants, setVariants] = useState<Variant[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCallVariants = async () => {
    setError('');
    setVariants([]);
    setLoading(true);

    const request: VariantCallRequest = {
      ref_fasta: refFasta,
      sample_fasta: sampleFasta,
    };

    try {
      const response = await axios.post<VariantCallResponse>(
        'http://localhost:8000/variant-call',
        request,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setVariants(response.data.variants);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || 'Failed to call variants'
      );
    } finally {
      setLoading(false);
    }
  };

  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case 'A': return 'text-green-500';
      case 'T': return 'text-red-500';
      case 'C': return 'text-blue-500';
      case 'G': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white flex flex-col items-center p-4">
      {/* DNA Helix Background Animation */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="animate-spin-slow w-full h-full bg-[url('https://www.svgrepo.com/show/305146/dna.svg')] bg-center bg-no-repeat bg-contain"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
      >
        Genomic Variant Caller
      </motion.h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Reference FASTA Input */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm"
        >
          <label className="block text-lg font-semibold mb-2">Reference FASTA</label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={refFasta}
            onChange={(e) => setRefFasta(e.target.value)}
            placeholder="Enter reference FASTA"
          />
        </motion.div>

        {/* Sample FASTA Input */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm"
        >
          <label className="block text-lg font-semibold mb-2">Sample FASTA</label>
          <textarea
            className="w-full h-40 p-3 bg-gray-900 border border-gray-700 rounded-md text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sampleFasta}
            onChange={(e) => setSampleFasta(e.target.value)}
            placeholder="Enter sample FASTA"
          />
        </motion.div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)' }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        onClick={handleCallVariants}
        className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
          loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Calling Variants...' : 'Call Variants'}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-red-600 bg-opacity-80 rounded-lg"
        >
          <strong>Error:</strong> {error}
        </motion.div>
      )}

      <AnimatePresence>
        {variants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 w-full max-w-4xl"
          >
            <h2 className="text-3xl font-semibold mb-4 text-center">Variants Detected</h2>
            <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-6 backdrop-blur-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Variant</th>
                    <th className="py-3 px-4">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-700 hover:bg-gray-700 hover:bg-opacity-50 transition-colors"
                    >
                      <td className="py-3 px-4">{v.position}</td>
                      <td className={`py-3 px-4 font-mono ${getNucleotideColor(v.reference)}`}>
                        {v.reference || '-'}
                      </td>
                      <td className={`py-3 px-4 font-mono ${getNucleotideColor(v.variant)}`}>
                        {v.variant || '-'}
                      </td>
                      <td className="py-3 px-4">{v.type}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {variants.length === 0 && !error && !loading && (
        <p className="mt-6 text-gray-400">Enter sequences and click to detect variants.</p>
      )}
    </div>
  );
};

export default VariantCaller;