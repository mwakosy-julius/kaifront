import React, { useState } from "react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import FastaInput from "./components/FastaInput";
import MotifResults from "./components/MotifResults";
import { findMotifs, MotifResponse } from "@/lib/services/tools/motif_finder";

const MotifFinder: React.FC = () => {
  const [fastaInput, setFastaInput] = useState<string>(
    ">seq1\nATCGATGCTAGCTAGC\n>seq2\nATGCTAGCTAGCATCG\n>seq3\nGCTAGCTAGCATCGAT"
  );
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<MotifResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindMotifs = async () => {
    setError("");
    setResponse(null);
    setLoading(true);

    let inputData = fastaInput;
    if (file) {
      try {
        inputData = await file.text();
      } catch {
        setError("Failed to read file");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await findMotifs(inputData);
      setResponse(res);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to find motifs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* DNA Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="animate-pulse w-full h-full bg-[url('https://www.svgrepo.com/show/305146/dna.svg')] bg-center bg-no-repeat bg-contain"></div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500"
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
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 15px rgba(0, 200, 255, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        disabled={loading || (!fastaInput && !file)}
        onClick={handleFindMotifs}
        className={`mt-8 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
          loading || (!fastaInput && !file)
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        }`}
      >
        {loading ? "Searching..." : "Find Motifs"}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-lg p-4 mt-6 bg-red-500 rounded-lg bg-opacity-80"
        >
          <strong>Error:</strong> {error}
        </motion.div>
      )}

      {response && <MotifResults response={response} fastaInput={fastaInput} />}
    </div>
  );
};

export default MotifFinder;
