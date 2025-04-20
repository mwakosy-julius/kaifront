import React, { ChangeEvent } from "react";
import { Upload } from "lucide-react";

export interface FastaUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  disabled?: boolean;
  onFileContentLoaded?: (content: string) => void;
  label?: string;
  accepts?: string;
  className?: string;
}

const FastaUploader: React.FC<FastaUploaderProps> = ({
  file,
  setFile,
  disabled = false,
  onFileContentLoaded,
  label = "Upload FASTA File",
  accepts = ".fasta,.fa,.txt",
  className = "",
}) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // If a callback for content is provided, read and load the file
      if (onFileContentLoaded) {
        try {
          const content = await selectedFile.text();
          onFileContentLoaded(content);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="fasta-file-upload"
          className="flex flex-col items-center justify-center w-full h-20 border border-dashed rounded-lg cursor-pointer bg-muted/20 border-border hover:bg-muted/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
          </div>
          <input
            id="fasta-file-upload"
            type="file"
            accept={accepts}
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
};

export default FastaUploader;
