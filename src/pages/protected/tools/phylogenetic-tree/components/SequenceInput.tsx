import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, RotateCw, GitBranch } from "lucide-react";

interface SequenceInputProps {
  sequences: string;
  setSequences: (sequences: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequences,
  setSequences,
  onSubmit,
  loading,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSequences(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSequences(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const loadSampleData = () => {
    setSequences(
      ">Seq1\nATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATC\n" +
        ">Seq2\nATCGTAGCTAGCTAGCTACGATCGATCGATCGATCGATCGATC\n" +
        ">Seq3\nCGATCGATCGTAGCTAGCTACGATCGTAGCTAGCTACGTAGCT\n" +
        ">Seq4\nGATCGATCGATCGATCGATCGATCGTAGCTAGCTAGCTAGCTA\n" +
        ">Seq5\nATCGATCGATCGATCGATCGATCGTAGCTAGCTAGCTAGCTAG"
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phylo-input">
          Enter Multiple Sequences in FASTA Format
        </Label>
        <Textarea
          id="phylo-input"
          value={sequences}
          onChange={(e) => setSequences(e.target.value)}
          placeholder=">Sequence1&#10;ATCGATCGATCG...&#10;>Sequence2&#10;GTCGTAGCTAGC...&#10;>Sequence3&#10;TGAGTAGTCGAC..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={onSubmit}
          disabled={loading || !sequences.trim()}
          variant="primary"
        >
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <GitBranch className="w-4 h-4 mr-2" />
              Generate Tree
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

      {/* {!sequences.trim() && (
        <p className="text-sm text-muted-foreground">
          Input multiple sequences in FASTA format to generate a phylogenetic
          tree. A minimum of 3 sequences is required for meaningful tree
          construction.
        </p>
      )} */}
    </div>
  );
};

export default SequenceInput;
