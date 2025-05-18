import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dna, Calculator, BookOpen, Share2, Upload, FileText, RefreshCcw, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface SequenceInputProps {
  sequence: string;
  setSequence: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  seqType: "dna" | "protein";
  setSeqType: (type: "dna" | "protein") => void;
  onSubmit: () => void;
  handleRunBlast: () => void;
  loading: boolean;
  error: string | null;
}

const stats = [
  { label: "Analysis Tool", value: "BLAST", icon: Calculator },
  { label: "Supported Sequences", value: "Protein/DNA", icon: Dna },
  { label: "Results", value: "Similar Sequences", icon: Calculator },
];

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  setFile,
  seqType,
  setSeqType,
  onSubmit,
//   handleRunBlast,
  loading,
  error,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          // Preview file content
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
        } catch (err) {
          console.error("Failed to read clipboard:", err);
        }
      };

      const sampleDna = ">sample_dna\nAGAGTTTGATCCTGGCTCAGGACGAACGCTGGCGGCGTGCCTAATACATGCAAGTCGAACGGCAGCACGGGTTGCGCTCGTTGCGGGACTTAACCCAACATCTCACGACACGGTGAGTAATGTCTGGGAAACTGCCTGATGGAGGGGGATAACTACTGGAAACGGTAGCTAATACCGCATAACGTCGCAAGACCAAAGAGGGGGACCTTCGGGCCTCACACGACAGGCGACGATCCGAACTGAGACACGGTCCAGACTCCTACGGGAGGCAGCAGTGGGGAATATTGGACAATGGGCGAAAGCCTGACGGAGCAACGCCGCGTGAGTGATGAAGGTTTTCGGATCGTAAAGCTCTGTTGTTAGGGAAGAACAAGTACGAGGGTGCGGAAGGCGGTTCTTCGCGTTGCAGCCGTTGAGGTCGGTGTTGAGGTAAG"
        ;

      const sampleProtein = ">Sample_Protein\nMTEITAAMVKELRESTGAGMMDCKNALSETQHEWAYKELGFQG"
        ;

      const loadSampleData = () => {
            setSequence(seqType === "dna" ? sampleDna : sampleProtein);
            setFile(null);
        };
    
    
  return (
    <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
          <Dna className="w-8 h-8" />
          BLAST Search Tool
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Analyze your sequence against a database for similar sequences
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
            <Label htmlFor="fasta-input">Enter Sequences in FASTA Format</Label>
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
            <Textarea
            id="fasta-input"
            value={sequence}
            onChange={(e) => {
                setSequence(e.target.value);
                setFile(null); // Clear file if textarea is edited
            }}
            placeholder={`Enter sequences in FASTA format:\n${
                seqType === "dna" ? sampleDna : sampleProtein
              }`}
            className="min-h-[200px] font-mono text-sm"
            />
        </div>

        <div className="flex flex-wrap gap-2">
            <Button onClick={onSubmit} disabled={loading || !sequence.trim()} variant="primary">
            {loading ? (
                <>
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
                </>
            ) : (
                <>
                <Dna className="w-4 h-4 mr-2" />
                Run Blast
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

          {/* Error Alert */}
        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
      </CardContent>
    </Card>
  );
};

export default SequenceInput;