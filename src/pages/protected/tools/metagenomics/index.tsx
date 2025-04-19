import React, { useState } from "react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
// import SequenceInput from "./components/SequenceInput";
// import TaxonomyTable from "./components/TaxonomyTable";
// import TaxonomyChart from "./components/TaxonomyChart";
import {
  analyzeMetagenomics,
  MetagenomicsResponse,
} from "@/lib/services/tools/metagenomics";

const Metagenomics: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [results, setResults] = useState<MetagenomicsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setResults(null);
    setLoading(true);

    try {
      const response = await analyzeMetagenomics(sequence);
      setResults(response);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail ||
          "Failed to analyze metagenomics data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-5xl font-bold text-center text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
        MetaGenome Explorer
      </h1>
      {/* <SequenceInput
        sequence={sequence}
        setSequence={setSequence}
        onSubmit={handleAnalyze}
        loading={loading}
      /> */}
      {loading && (
        <p className="mt-4 text-center text-blue-400">
          Analyzing metagenomics data...
        </p>
      )}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {results && (
        <div className="space-y-8">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green-400">
              Analysis Summary
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 text-center bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Total Reads
                </h3>
                <p className="text-3xl font-bold text-white">
                  {results.stats.total_reads}
                </p>
              </div>
              <div className="p-4 text-center bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Classified
                </h3>
                <p className="text-3xl font-bold text-green-400">
                  {results.stats.classified_reads}
                </p>
              </div>
              <div className="p-4 text-center bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-300">
                  Unclassified
                </h3>
                <p className="text-3xl font-bold text-red-400">
                  {results.stats.unclassified_reads}
                </p>
              </div>
            </div>
          </div>
          {/* <TaxonomyChart data={results.visualization_data} />
          <TaxonomyTable matches={results.matches} /> */}
        </div>
      )}
    </div>
  );
};

export default Metagenomics;
