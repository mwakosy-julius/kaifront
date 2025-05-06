import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, RotateCw, Search, Database } from "lucide-react";

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSequence(event.target.result as string);
      }
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

  const loadSampleData = () => {
    // Sample metagenomic data - simplified for demonstration
    setSequence(
      ">seq1\n" +
      "ATCGATCGTAGCTAGCTGACTAGCTAGCTAGCTAGCTAGCTAGCTACGTACGTAGCTAGCTAGCTA\n" +
      ">seq2\n" +
        "CTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT\n" +
        ">seq3\n" +
        "AGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG\n" +
        ">seq4\n" +
        "CTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT"
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="metagenomics-input">
          Enter Metagenomic Sequence Data
        </Label>
        <Textarea
          id="metagenomics-input"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Paste your metagenomic sequence data here..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSubmit} disabled={loading || !sequence.trim()} variant="primary">
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Analyze Metagenome
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
            Upload Sequence File
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".fasta,.fa,.txt,.fq,.fastq"
              onChange={handleFileChange}
            />
          </Button>
        </div>

        <Button variant="secondary" onClick={loadSampleData}>
          <Database className="w-4 h-4 mr-2" />
          Load Sample
        </Button>
      </div>

      {/* {!sequence.trim() && (
        <p className="text-sm text-muted-foreground">
          Input metagenomic sequence data for taxonomic analysis. The tool
          accepts raw reads, assembled contigs, or any DNA sequence data from a
          microbial community sample.
        </p>
      )} */}
    </div>
  );
};

export default SequenceInput;
