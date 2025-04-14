import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface MotifResultsProps {
  response: MotifResponse;
  fastaInput: string;
}

const MotifResults: React.FC<MotifResultsProps> = ({ response, fastaInput }) => {
  // Parse FASTA for sequence display
  const parseFasta = (fasta: string): string[] => {
    const sequences: string[] = [];
    let currentSeq: string[] = [];
    const lines = fasta.trim().split('\n');
    for (const line of lines) {
      if (line.startsWith('>')) {
        if (currentSeq.length) {
          sequences.push(currentSeq.join(''));
          currentSeq = [];
        }
      } else {
        currentSeq.push(line.trim());
      }
    }
    if (currentSeq.length) {
      sequences.push(currentSeq.join(''));
    }
    return sequences.filter(seq => seq);
  };

  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case 'A': return 'text-green-400';
      case 'T': return 'text-red-400';
      case 'C': return 'text-blue-400';
      case 'G': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  // Highlight sequences
  const highlightSequence = (seq: string, motif: string, seqId: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    let pos = 0;
    const motifLength = motif.length;

    while (pos < seq.length) {
      if (response.positions.some(p => p.sequence === seqId && p.position === pos + 1)) {
        const motifPart = seq.slice(pos, pos + motifLength);
        parts.push(
          <span key={`${seqId}-${pos}-motif`} className="font-bold bg-gray-700 px-1 rounded">
            {motifPart.split('').map((base, i) => (
              <span key={`${seqId}-${pos}-base-${i}`} className={getNucleotideColor(base)}>
                {base}
              </span>
            ))}
          </span>
        );
        pos += motifLength;
      } else {
        parts.push(
          <span key={`${seqId}-${pos}-base`} className={getNucleotideColor(seq[pos])}>
            {seq[pos]}
          </span>
        );
        pos += 1;
      }
    }
    return parts;
  };

  const sequences = parseFasta(fastaInput);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mt-8"
    >
      <h2 className="text-3xl font-semibold mb-4 text-center text-cyan-300">
        Motif Results
      </h2>
      <div className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-lg backdrop-blur-md">
        <div className="mb-6">
          <strong className="text-lg">Consensus Motif:</strong>
          <div className="font-mono text-lg flex flex-wrap gap-1 mt-2">
            {response.consensus.split('').map((base, idx) => (
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
          <p className="mt-2 text-gray-300">
            Score: {response.score.toFixed(2)} | Motif Length: {response.motif_length}
          </p>
        </div>

        <AnimatePresence>
          {response.positions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Motif Instances</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4">Sequence</th>
                    <th className="py-2 px-4">Position</th>
                    <th className="py-2 px-4">Motif</th>
                  </tr>
                </thead>
                <tbody>
                  {response.positions.map((p, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-700 hover:bg-gray-700 hover:bg-opacity-50"
                    >
                      <td className="py-2 px-4">{p.sequence}</td>
                      <td className="py-2 px-4">{p.position}</td>
                      <td className="py-2 px-4 font-mono">
                        {p.motif.split('').map((base, i) => (
                          <span key={i} className={getNucleotideColor(base)}>
                            {base}
                          </span>
                        ))}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-200">Input Sequences</h3>
        <div className="font-mono text-sm">
          {sequences.map((seq, idx) => (
            <div key={idx} className="mb-3 break-all">
              <strong>{`seq${idx + 1}`}: </strong>
              {highlightSequence(seq, response.consensus, `seq${idx + 1}`)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MotifResults;