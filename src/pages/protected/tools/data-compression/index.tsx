import React, { useState } from "react";
import { AxiosError } from "axios";
import { FastaInput } from "./components/FastaInput";
import { CompressionResults } from "./components/CompressionResults";
import {
  compressData,
  CompressionRequest,
  CompressionResponse,
} from "@/lib/services/tools/data_compression";

const DataCompression: React.FC = () => {
  const [fasta, setFasta] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [method, setMethod] = useState<"run_length" | "delta">("run_length");
  const [reference, setReference] = useState<string>("");
  const [result, setResult] = useState<CompressionResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompress = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    const request: CompressionRequest = {
      sequence: fasta,
      method,
      ...(method === "delta" && reference ? { reference } : {}),
    };

    try {
      const response = await compressData(request);
      setResult(response);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to compress data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <FastaInput
        fasta={fasta}
        setFasta={setFasta}
        file={file}
        setFile={setFile}
        method={method}
        setMethod={setMethod}
        reference={reference}
        setReference={setReference}
        handleCompress={handleCompress}
        loading={loading}
        error={error}
      />
      <CompressionResults result={result} />
    </div>
  );
};

export default DataCompression;