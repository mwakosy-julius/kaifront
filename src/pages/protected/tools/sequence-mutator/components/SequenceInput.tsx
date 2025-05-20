import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dna, Calculator, BookOpen, Share2, Upload, FileText, RefreshCcw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SequenceInputProps {
  sequence: string;
  setSequence: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  sequenceType: "dna" | "protein";
  setSequenceType: (value: "dna" | "protein") => void;
  mutationType: "substitution" | "insertion" | "deletion";
  setMutationType: (value: "substitution" | "insertion" | "deletion") => void;
  mutationRate: number;
  setMutationRate: (value: number) => void;
  handleMutate: () => void;
  loading: boolean;
  error: string | null;
}

const stats = [
  { label: "Analysis Tool", value: "Sequence Mutator", icon: Calculator },
  { label: "Supported Sequences", value: "DNA/Protein", icon: Dna },
  { label: "Results", value: "Mutated Sequences", icon: Calculator },
];

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  file,
  setFile,
  sequenceType,
  setSequenceType,
  mutationType,
  setMutationType,
  mutationRate,
  setMutationRate,
  handleMutate,
  loading,
  error,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSequence(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSequence(text);
      setFile(null);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const sampleDna = ">sample_dna\nATCGATCGATCGATCGATCG";
  const sampleProtein = ">sample_protein\nMVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTK";

  const loadSampleData = () => {
    setSequence(sequenceType === "dna" ? sampleDna : sampleProtein);
    setFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto space-y-6"
    >
      <Card className="container mx-auto space-y-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
            <Dna className="w-8 h-8" />
            Sequence Mutator
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Mutate DNA or protein sequences in FASTA format with specified parameters
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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sequence">Enter Sequence in FASTA Format</Label>
              <RadioGroup
                value={sequenceType}
                onValueChange={(value) => setSequenceType(value as "dna" | "protein")}
                className="flex items-center space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="dna" id="dna" />
                  <Label htmlFor="dna" className="cursor-pointer">DNA</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="protein" id="protein" />
                  <Label htmlFor="protein" className="cursor-pointer">Protein</Label>
                </div>
              </RadioGroup>
              <Textarea
                id="sequence"
                value={sequence}
                onChange={(e) => {
                  setSequence(e.target.value);
                  setFile(null);
                }}
                placeholder={`Enter sequence in FASTA format:\n${sequenceType === "dna" ? sampleDna : sampleProtein}`}
                className="min-h-[200px] font-mono text-sm"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mutationType">Mutation Type</Label>
              <Select onValueChange={setMutationType} value={mutationType}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Select mutation type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-white border-gray-600">
                  <SelectItem value="substitution">Substitution</SelectItem>
                  <SelectItem value="insertion">Insertion</SelectItem>
                  <SelectItem value="deletion">Deletion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mutationRate">Mutation Rate (0–1)</Label>
              <input
                id="mutationRate"
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={mutationRate}
                onChange={(e) => setMutationRate(Number(e.target.value))}
                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleMutate}
              disabled={loading || !sequence.trim()}
              variant="primary"
              className="transition-all duration-300 hover:[box-shadow:_0_0_12px_#ff0000]"
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Mutating...
                </>
              ) : (
                <>
                  <Dna className="w-4 h-4 mr-2" />
                  Mutate Sequence
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

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SequenceInput;