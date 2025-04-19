import React, { useState } from "react";
import { AxiosError } from "axios";
import SequenceInput from "./components/SequenceInput";
import AlignmentDisplay from "./components/AlignmentDisplay";
// import AlignmentHeatmap from "./components/AlignmentHeatmap";
import {
  alignSequences,
  MultipleAlignmentRequest,
} from "@/lib/services/tools/multiple_alignment";

const App: React.FC = () => {
  const [sequences, setSequences] = useState("");
  const [seqType, setSeqType] = useState<"dna" | "protein">("dna");
  const [alignment, setAlignment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setAlignment("");

    try {
      const request: MultipleAlignmentRequest = {
        sequences,
        seq_type: seqType,
      };

      const data = await alignSequences(request);
      setAlignment(data.alignment);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || "Failed to fetch alignment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-5xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
        MultiAlign
      </h1>
      <SequenceInput
        sequences={sequences}
        setSequences={setSequences}
        seqType={seqType}
        setSeqType={setSeqType}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      {alignment && (
        <>
          <AlignmentDisplay alignment={alignment} />
          {/* <AlignmentHeatmap alignment={alignment} /> */}
        </>
      )}
    </div>
  );
};

export default App;
