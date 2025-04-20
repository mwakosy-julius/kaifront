import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, RotateCw } from "lucide-react";

interface SequenceInputProps {
  sequence: string;
  setSequence: (sequence: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  onSubmit,
  loading,
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sequence-input">Enter DNA or RNA Sequence</Label>
        <Textarea
          id="sequence-input"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Paste your DNA or RNA sequence here..."
          className="min-h-[150px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSubmit} disabled={loading || !sequence.trim()}>
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Sequence"
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
      </div>

      {!sequence.trim() && (
        <p className="text-sm text-muted-foreground">
          Enter a DNA or RNA sequence to analyze codon usage patterns.
        </p>
      )}
    </div>
  );
};

export default SequenceInput;
