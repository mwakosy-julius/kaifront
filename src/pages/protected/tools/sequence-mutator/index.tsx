import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import MutationResults from "./components/MutationResults";
import { MutationResult, mutateSequence } from "@/lib/services/tools/sequence_mutator";

const SequenceMutator: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [sequenceType, setSequenceType] = useState("dna");
  const [mutationType, setMutationType] = useState("substitution");
  const [mutationRate, setMutationRate] = useState(0.1);
  const [result, setResult] = useState<MutationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-gray-900">
      <main className="py-16 px-4 sm:px-6 lg:px-8">
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
        />
        <MutationResults result={result} />
      </main>
    </div>
  );
};

export default SequenceMutator;