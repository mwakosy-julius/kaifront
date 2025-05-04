import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, RefreshCcw, Dna } from "lucide-react";

interface FastaInputProps {
  fasta: string;
  setFasta: (fasta: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  onSubmit: () => void;
  loading: boolean;
}

const FastaInput: React.FC<FastaInputProps> = ({
  fasta,
  setFasta,
  setFile,
  onSubmit,
  loading,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Preview file content
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFasta(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFasta(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const loadSampleData = () => {
    setFasta(
      ">seq1\nATCGATCGATCGATCGATCGATCGATCG\n" +
        ">seq2\nATGGATCGATCGATCGATCGATCGATCG\n" +
        ">seq3\nATCGATCGATCGATCGATCGATCGATCG\n" +
        ">seq4\nATCGATGGATCGATCGATCGATCGATCG"
    );
    setFile(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fasta-input">Enter Sequences in FASTA Format</Label>
        <Textarea
          id="fasta-input"
          value={fasta}
          onChange={(e) => {
            setFasta(e.target.value);
            setFile(null); // Clear file if textarea is edited
          }}
          placeholder=">sequence1&#10;ATCGATCGTAGCTAGCTAGTCGA&#10;>sequence2&#10;AGTCGATCGTAGCTAGCTAGTCGA"
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSubmit} disabled={loading || !fasta.trim()}>
          {loading ? (
            <>
              <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Dna className="w-4 h-4 mr-2" />
              Generate Consensus
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
            Upload FASTA File
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".fasta,.fa,.txt"
              onChange={handleFileChange}
            />
          </Button>
        </div>

        <Button variant="secondary" onClick={loadSampleData}>
          Load Sample
        </Button>
      </div>

      {/* {!fasta.trim() && (
        <p className="text-sm text-muted-foreground">
          Input multiple sequences in FASTA format with header lines (starting
          with &gt;) to generate a consensus sequence.
        </p>
      )} */}
    </div>
  );
};

export default FastaInput;
