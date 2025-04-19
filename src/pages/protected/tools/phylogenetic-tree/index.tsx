import React, { useState } from "react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import {
  generatePhylogeneticTree,
  PhylogeneticTreeResponse,
} from "@/lib/services/tools/phylogenetic_tree";
import SequenceInput from "./components/SequenceInput";
import TreeVisualization from "./components/TreeVisualization";
import DownloadButtons from "./components/DownloadButtons";
import "./App.css";

const PhylogeneticTree: React.FC = () => {
  const [sequences, setSequences] = useState("");
  const [treeData, setTreeData] = useState<PhylogeneticTreeResponse | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateTree = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await generatePhylogeneticTree(sequences);
      setTreeData(data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to generate tree");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8">
        PhyloViz
      </h1>
      <SequenceInput
        sequences={sequences}
        setSequences={setSequences}
        onSubmit={handleGenerateTree}
      />
      {loading && (
        <p className="text-center text-blue-400 mt-4">Generating tree...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {treeData && (
        <div className="space-y-6">
          <TreeVisualization svg={treeData.svg} />
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Newick Format</h2>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
              {treeData.newick}
            </pre>
          </div>
          <DownloadButtons treeData={treeData} />
        </div>
      )}
    </div>
  );
};

export default PhylogeneticTree;
