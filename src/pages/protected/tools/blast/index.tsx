import React, { useState } from "react";
import { runBlast, BlastResult } from "@/lib/services/tools/blast";
import SequenceInput from "./components/SequenceInput";
import BlastResults from "./components/BlastResults";

const BlastTool: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [results, setResults] = useState<BlastResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [seqType, setSeqType] = useState<"dna" | "protein">("dna");

  const handleRunBlast = async () => {
    if (!sequence) {
      setError("Please provide a sequence.");
      return;
    }

    // Basic DNA validation
    const cleanedSequence = sequence.toUpperCase().replace(/[^ACGT]/g, "");
    if (!cleanedSequence) {
      setError("Invalid DNA sequence. Only A, C, G, T are allowed.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await runBlast({ sequence, seqType: seqType });
      setResults([data]);
    } catch (err) {
      setError("An error occurred while fetching BLAST results.");
      console.error("BLAST error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <SequenceInput
        sequence={sequence}
        file={file}
        setFile={setFile}
        seqType={seqType}
        setSeqType={setSeqType}
        onSubmit={handleRunBlast}
        setSequence={setSequence}
        handleRunBlast={handleRunBlast}
        loading={loading}
        error={error}
      />
    <BlastResults results={results} />
    </div>
  );
};

export default BlastTool;