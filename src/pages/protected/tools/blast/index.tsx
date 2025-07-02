import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  primerDesign,
  PrimerRequest,
  Primer,
} from "@/lib/services/tools/primer_design";
import SequenceInput from "./components/SequenceInput";
import PrimerResults from "./components/PrimerResults";

const PrimerDesignTool: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [primers, setPrimers] = useState<Primer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handlePrimerDesign = async () => {
    if (!sequence) {
      setError("Please provide a DNA sequence.");
      return;
    }

    const cleanedSequence = sequence.toUpperCase().replace(/[^ATCG]/g, "");
    if (!cleanedSequence) {
      setError("Invalid DNA sequence. Only A, T, C, G are allowed.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrimers([]);

    const request: PrimerRequest = { sequence: cleanedSequence };

    try {
      const data = await primerDesign(request);
      setPrimers(data.primers);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || "Failed to design primers.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <SequenceInput
        sequence={sequence}
        setSequence={setSequence}
        file={file}
        setFile={setFile}
        onSubmit={handlePrimerDesign}
        loading={loading}
        error={error}
      />
      <PrimerResults primers={primers} />
    </div>
  );
};

export default PrimerDesignTool;
