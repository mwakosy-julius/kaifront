import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, FileText, Upload, RefreshCcw } from "lucide-react";

interface SequenceInputProps {
  sequence: string;
  setSequence: (sequence: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  onSubmit,
  isLoading = false,
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setSequence(content);
      };
      reader.readAsText(file);
    };
  
    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText();
        setSequence(text);
      } catch (err) {
        console.error("Failed to read clipboard:", err);
      }
    };
  
    const loadSampleSequence = () => {
      setSequence("CGATCTAGTCGTAGCTGATCTGATCTAGCTGATCATGCTAGTCGTAGCTATCGATCGTATCGTAGCTAGTCGTAGTGCTGATC");
    };
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Enter DNA Sequence</p>
        <Textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter DNA sequence (e.g., ATGCAATTCGCTA)"
          className="h-32 font-mono"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !sequence.trim()}
          variant="primary"
          // size="lg"
        >
          {isLoading ? (
            <>
              <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Analyze Sequence
            </>
          )}
        </Button>
        <Button variant="outline" onClick={handlePaste}>
          <FileText className="w-4 h-4 mr-2" />
          Paste from Clipboard
        </Button>

        <div className="relative">
          <Button variant="outline" className="relative">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".txt,.fasta,.fa,.seq"
              onChange={handleFileUpload}
            />
          </Button>
        </div>

        <Button variant="secondary" onClick={loadSampleSequence}>
          Load Sample
        </Button>
      </div>
    </div>
  );
};

export default SequenceInput;
