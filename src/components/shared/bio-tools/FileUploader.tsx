import React, { ChangeEvent } from "react";
import { Upload, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FileUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
  disabled?: boolean;
  onFileContentLoaded?: (content: string) => void;
  label?: string;
  accepts?: string;
  className?: string;
  buttonVariant?: "default" | "outline" | "ghost";
  maxFileSizeMB?: number;
  dropzoneHeight?: string;
  compact?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  file,
  setFile,
  disabled = false,
  onFileContentLoaded,
  label = "Upload File",
  accepts = "*/*",
  className = "",
  buttonVariant = "outline",
  maxFileSizeMB = 10,
  dropzoneHeight = "h-20",
  compact = false,
}) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file size
    if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
      alert(`File size exceeds the ${maxFileSizeMB}MB limit`);
      return;
    }

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
  };

  const clearFile = () => {
    setFile(null);
  };

  const renderCompactMode = () => (
    <div className="flex items-center gap-2">
      <Button
        variant={buttonVariant}
        size="sm"
        disabled={disabled}
        onClick={() => document.getElementById("file-upload-input")?.click()}
      >
        <Upload className="w-4 h-4 mr-1" />
        {label}
      </Button>

      {file && (
        <div className="flex items-center gap-1 text-sm">
          <span className="max-w-[200px] truncate">{file.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={clearFile}
          >
            <FileX className="h-4 w-4" />
          </Button>
        </div>
      )}

      <input
        id="file-upload-input"
        type="file"
        accept={accepts}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );

  const renderDropzone = () => (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload-input"
          className={`flex flex-col items-center justify-center w-full ${dropzoneHeight} border border-dashed rounded-lg cursor-pointer bg-muted/20 border-border hover:bg-muted/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {file ? (
              <div className="flex flex-col items-center">
                <p className="text-sm mb-1 text-muted-foreground">
                  {file.name}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      clearFile();
                    }}
                  >
                    <FileX className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {accepts.split(",").join(", ")}
                </p>
              </>
            )}
          </div>
          <input
            id="file-upload-input"
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

  return compact ? renderCompactMode() : renderDropzone();
};

export default FileUploader;
