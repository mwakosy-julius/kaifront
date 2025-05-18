import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import StructureResults from "./components/StructureResults";
import { predictStructure, StructurePrediction } from "@/lib/services/tools/protein_structure";

const ProteinStructurePredictor: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState<StructurePrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!sequence.trim()) {
      setError("Please enter an amino acid sequence.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictStructure(sequence);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <SequenceInput
          sequence={sequence}
          setSequence={setSequence}
          handlePredict={handlePredict}
          loading={loading}
          error={error}
        />
        <StructureResults result={result} />
      </main>
    </div>
  );
};

export default ProteinStructurePredictor;