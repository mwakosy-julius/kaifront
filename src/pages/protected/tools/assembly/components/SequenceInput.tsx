import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dna,
  Calculator,
  BookOpen,
  Share2,
  Upload,
  FileText,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SequenceInputProps {
  onProcess: (result: any) => void;
  setError: (error: string) => void;
  loading: boolean;
  error: string;
}

const stats = [
  { label: "Analysis Tool", value: "DNA Assembly", icon: Calculator },
  { label: "Supported Sequences", value: "DNA Fragments", icon: Dna },
  { label: "Results", value: "Assembled Sequence", icon: Calculator },
];

const SequenceInput: React.FC<SequenceInputProps> = ({
  onProcess,
  loading,
  setError,
  error,
}) => {
  const [fragments, setFragments] = useState<string>("");
  const [minOverlap, setMinOverlap] = useState<number>(20);
  const [localError, setLocalError] = useState<string>("");

  const handleFragmentChange = (value: string) => {
    setFragments(value.toUpperCase());
  };

  const handleRunAssembly = async () => {
    setLocalError("");
    setError("");

    // Split textarea input into fragments by lines or FASTA headers
    const fragmentArray = fragments
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith(">"))
      .map((line) => line.trim());

    // Validate inputs
    if (fragmentArray.length === 0) {
      const errorMsg = "Please provide at least one DNA fragment.";
      setLocalError(errorMsg);
      setError(errorMsg);
      return;
    }

    if (minOverlap < 1) {
      const errorMsg = "Minimum overlap must be at least 1.";
      setLocalError(errorMsg);
      setError(errorMsg);
      return;
    }

    try {
      // Mock assembly result for now - replace with actual assembly logic
      const result = {
        assembledSequence: fragmentArray.join(""),
        fragments: fragmentArray,
        minOverlap: minOverlap,
      };
      onProcess(result);
    } catch (err: any) {
      const errorMsg = err.message || "An unexpected error occurred";
      setLocalError(errorMsg);
      setError(errorMsg);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFragments(text.toUpperCase());
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      setLocalError("Failed to paste from clipboard.");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setFragments(text.toUpperCase());
    } catch (err) {
      console.error("Failed to read file:", err);
      setLocalError("Failed to upload file.");
    }
  };

  const handleLoadSample = () => {
    const sampleFragments =
      ">Fragment1\nATCG\n>Fragment2\nTCGA\n>Fragment3\nCGAT";
    setFragments(sampleFragments);
    setMinOverlap(3);
    setLocalError("");
    setError("");
  };

  return (
    <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
          <Dna className="w-8 h-8" />
          DNA Fragment Assembly Tool
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Assemble DNA fragments into a contiguous sequence
        </CardDescription>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            <BookOpen className="w-3 h-3 mr-1" />
            Documentation
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Share2 className="w-3 h-3 mr-1" />
            Share Results
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 p-4 rounded bg-muted/50">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="p-3 rounded bg-primary/10">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-600" />

        <div className="space-y-2">
          <Label htmlFor="fragments-input">
            Enter DNA Fragments in FASTA Format
          </Label>
          <Textarea
            id="fragments-input"
            value={fragments}
            onChange={(e) => handleFragmentChange(e.target.value)}
            placeholder={`Enter DNA fragments in FASTA format:\n>Fragment1\nATCG\n>Fragment2\nTCGA\n>Fragment3\nCGAT`}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="min-overlap">Minimum Overlap</Label>
          <Input
            id="min-overlap"
            type="number"
            value={minOverlap}
            onChange={(e) => setMinOverlap(Number(e.target.value))}
            min="1"
            className="font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleRunAssembly}
            disabled={!fragments.trim()}
            variant="primary"
          >
            {loading ? (
              <>
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Dna className="w-4 h-4 mr-2" />
                Run Assembly
              </>
            )}
          </Button>

          <Button variant="outline" onClick={handlePaste}>
            <BookOpen className="w-4 h-4 mr-2" />
            Paste from Clipboard
          </Button>

          <div className="relative">
            <Button variant="outline" className="relative">
              <Upload className="w-4 h-4 mr-2" />
              Upload FASTA File
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".fasta,.fa,.txt,.fastq"
                onChange={handleFileChange}
              />
            </Button>
          </div>

          <Button variant="secondary" onClick={handleLoadSample}>
            Load Sample
          </Button>
        </div>

        {localError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{localError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SequenceInput;
