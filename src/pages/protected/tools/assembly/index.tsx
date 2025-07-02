import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import AssemblyResults from "./components/AssemblyResults";

const AssemblyTool: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [results, setResults] = useState<{
    assembled_sequence: string;
    fragment_count: number;
    min_overlap: number;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = (result: any) => {
    // if (!sequence) {
    //   setError("Please provide a sequence.");
    //   return;
    // }

    // // Basic DNA validation
    // const cleanedSequence = sequence.toUpperCase().replace(/[^ACGT]/g, "");
    // if (!cleanedSequence) {
    //   setError("Invalid DNA sequence. Only A, C, G, T are allowed.");
    //   return;
    // }

    setLoading(true);
    setError(null);

    setResults(result);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="container mx-auto space-y-6">
      <SequenceInput
        sequence={sequence}
        file={file}
        setFile={setFile}
        setSequence={setSequence}
        onProcess={handleProcess}
        setError={setError}
        loading={loading}
        error={error}
      />

      <AssemblyResults result={results} />
    </div>
  );
};

export default AssemblyTool;
