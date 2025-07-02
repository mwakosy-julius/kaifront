import React, { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import QCResults from "./components/QCResults";

const QualityControlTool: React.FC = () => {
  const [results, setResults] = useState<{
    reportHtml: string;
    files: { filename: string; content: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async (dataType: string, file1: File, file2?: File) => {
    setError(null);
    setResults(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("data_type", dataType);
    formData.append("file1", file1);
    if (file2) {
      formData.append("file2", file2);
    }

    try {
      const response = await fetch("http://localhost:8000/process-fastq/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to process files");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <SequenceInput
        onProcess={handleProcess}
        loading={loading}
        error={error}
      />
      <QCResults reportHtml={results?.reportHtml} files={results?.files} />
    </div>
  );
};

export default QualityControlTool;
