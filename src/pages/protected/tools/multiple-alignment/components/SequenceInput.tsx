import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText, RotateCw, ArrowRight } from "lucide-react";

interface SequenceInputProps {
  sequences: string;
  setSequences: (sequences: string) => void;
  seqType: "dna" | "protein";
  setSeqType: (type: "dna" | "protein") => void;
  onSubmit: () => void;
  loading: boolean;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequences,
  setSequences,
  seqType,
  setSeqType,
  onSubmit,
  loading,
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSequences(content);
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

  const sampleDna = `>Sequence1
ATGCTAGCTAGCTAGCTAGCTAGC
>Sequence2
ATGCTAGCTCGCTAGCTAGCTAGA
>Sequence3
ATGCTAGCTTGCTAGCTAGCTAGC`;

  const sampleProtein = `>Protein1
MVLSPADKTNVKAAWGKVGAHAGEYGAEALERM
>Protein2
MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLL
>Protein3
MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERM`;

  const loadSample = () => {
    setSequences(seqType === "dna" ? sampleDna : sampleProtein);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label className="text-base font-medium">Sequence type:</Label>
        <RadioGroup
          defaultValue={seqType}
          value={seqType}
          onValueChange={(value) => setSeqType(value as "dna" | "protein")}
          className="flex items-center space-x-2"
        >
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="dna" id="dna" />
            <Label htmlFor="dna" className="cursor-pointer">
              DNA
            </Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="protein" id="protein" />
            <Label htmlFor="protein" className="cursor-pointer">
              Protein
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sequence-input">
          Enter multiple sequences in FASTA format
        </Label>
        <Textarea
          id="sequence-input"
          value={sequences}
          onChange={(e) => setSequences(e.target.value)}
          placeholder={`Enter sequences in FASTA format:\n${
            seqType === "dna" ? sampleDna : sampleProtein
          }`}
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSubmit} disabled={loading || !sequences.trim()}>
          {loading ? (
            <>
              <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              Aligning...
            </>
          ) : (
            <>
              Align Sequences
              <ArrowRight className="w-4 h-4 ml-2" />
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
              onChange={handleFileUpload}
            />
          </Button>
        </div>

        <Button variant="secondary" onClick={loadSample}>
          Load Sample
        </Button>
      </div>

      {/* {!sequences.trim() && (
        <p className="text-sm text-muted-foreground">
          Input multiple sequences in FASTA format with a header line (starting
          with &gt;) for each sequence.
        </p>
      )} */}
    </div>
  );
};

export default SequenceInput;
