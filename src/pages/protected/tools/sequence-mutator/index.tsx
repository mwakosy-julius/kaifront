import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import MutationResults from "./components/MutationResults";
import { MutationResult, mutateSequence } from "@/lib/services/tools/sequence_mutator";

const SequenceMutator: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [sequenceType, setSequenceType] = useState<"dna" | "protein">("dna");
  const [mutationType, setMutationType] = useState<"substitution" | "insertion" | "deletion">("substitution");
  const [mutationRate, setMutationRate] = useState(0.1);
  const [result, setResult] = useState<MutationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleMutate = async () => {
    if (!sequence.trim()) {
      setError("Please enter a sequence.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await mutateSequence(sequence, sequenceType, mutationType, mutationRate);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Mutation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <SequenceInput
        sequence={sequence}
        setSequence={setSequence}
        sequenceType={sequenceType}
        setSequenceType={setSequenceType}
        mutationType={mutationType}
        setMutationType={setMutationType}
        mutationRate={mutationRate}
        setMutationRate={setMutationRate}
        handleMutate={handleMutate}
        loading={loading}
        error={error}
        file={file}
        setFile={setFile}
      />
      <MutationResults result={result} />
    </div>
  );
};

export default SequenceMutator;