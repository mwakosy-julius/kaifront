import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dna,
  Calculator,
  BookOpen,
  Share2,
  Upload,
  FileText,
  RefreshCcw,
  AlertCircle,
  Thermometer,
  Percent,
} from "lucide-react";

interface SequenceInputProps {
  sequence: string;
  setSequence: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  primerLen: number;
  setPrimerLen: (value: number) => void;
  tmMin: number;
  setTmMin: (value: number) => void;
  tmMax: number;
  setTmMax: (value: number) => void;
  gcMin: number;
  setGcMin: (value: number) => void;
  gcMax: number;
  setGcMax: (value: number) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}

const stats = [
  { label: "Analysis Tool", value: "Primer Design", icon: Calculator },
  { label: "Supported Sequences", value: "DNA", icon: Dna },
  { label: "Results", value: "Optimized Primers", icon: Calculator },
];

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  file,
  setFile,
  primerLen = 20,
  setPrimerLen,
  tmMin = 50,
  setTmMin,
  tmMax = 65,
  setTmMax,
  gcMin = 40,
  setGcMin,
  gcMax = 60,
  setGcMax,
  onSubmit,
  loading,
  error,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSequence(event.target.result as string);
          setFile(selectedFile);
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

  const sampleDna =
    ">sample_dna\nATCGATCGATCGATCGACGATCATGTGCTATCATGTCGATGCTAGTCGTAGTCGATGCTAGTCGATGCTAGCTATCGTAGCTATC";

  const loadSampleData = () => {
    setSequence(sampleDna);
    setFile(null);
    setPrimerLen(20);
    setTmMin(50);
    setTmMax(65);
    setGcMin(40);
    setGcMax(60);
  };

  const validateParameters = () => {
    if (!Number.isInteger(primerLen) || primerLen < 10 || primerLen > 30) {
      return "Primer length must be an integer between 10 and 30 bases.";
    }
    if (tmMin < 40 || tmMin > 80 || tmMax < 40 || tmMax > 80 || tmMin > tmMax) {
      return "Melting temperature must be between 40°C and 80°C, and minimum must be less than or equal to maximum.";
    }
    if (gcMin < 20 || gcMin > 80 || gcMax < 20 || gcMax > 80 || gcMin > gcMax) {
      return "GC content must be between 20% and 80%, and minimum must be less than or equal to maximum.";
    }
    return "";
  };

  const handleSubmit = () => {
    const paramError = validateParameters();
    if (paramError) {
      setError(paramError);
      return;
    }
    onSubmit();
  };

  return (
    <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
          <Dna className="w-8 h-8" />
          Primer Design Tool
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Design optimized primers for your DNA sequence
        </CardDescription>
        <div className="flex gap-2 mt-2">
          <Badge
            variant="outline"
            className="text-xs hover:bg-primary/10 transition"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            Documentation
          </Badge>
          <Badge
            variant="outline"
            className="text-xs hover:bg-primary/10 transition"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Share Results
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50 shadow-sm">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="p-3 rounded-full bg-primary/10">
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
          <Label htmlFor="fasta-input" className="text-base font-medium">
            Enter DNA Sequence in FASTA Format
          </Label>
          <Textarea
            id="fasta-input"
            value={sequence}
            onChange={(e) => {
              setSequence(e.target.value.toUpperCase());
              setFile(null);
            }}
            placeholder={`Enter DNA sequence in FASTA format:\n${sampleDna}`}
            className="min-h-[200px] font-mono text-sm rounded-lg border border-input bg-background/50 shadow-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="primer-len"
              className="text-base font-medium flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-primary" />
              Primer Length (bases)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Input
                    id="primer-len"
                    type="number"
                    value={primerLen}
                    onChange={(e) => setPrimerLen(Number(e.target.value))}
                    min="10"
                    max="30"
                    step="1"
                    placeholder="20"
                    className="font-mono text-sm max-w-xs rounded-lg border border-input bg-background/50 shadow-sm focus:ring-2 focus:ring-primary hover:border-primary/50 transition"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  Length of the primer (10–30 bases, integer). Default: 20
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="tm-min"
              className="text-base font-medium flex items-center gap-2"
            >
              <Thermometer className="w-4 h-4 text-primary" />
              Melting Temperature (°C)
            </Label>
            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      id="tm-min"
                      type="number"
                      value={tmMin}
                      onChange={(e) => setTmMin(Number(e.target.value))}
                      min="40"
                      max="80"
                      step="0.1"
                      placeholder="50"
                      className="font-mono text-sm max-w-xs rounded-lg border border-input bg-background/50 shadow-sm focus:ring-2 focus:ring-primary hover:border-primary/50 transition"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    Minimum melting temperature (40–80°C). Default: 50
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      id="tm-max"
                      type="number"
                      value={tmMax}
                      onChange={(e) => setTmMax(Number(e.target.value))}
                      min="40"
                      max="80"
                      step="0.1"
                      placeholder="65"
                      className="font-mono text-sm max-w-xs rounded-lg border border-input bg-background/50 shadow-sm focus:ring-2 focus:ring-primary hover:border-primary/50 transition"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    Maximum melting temperature (40–80°C). Default: 65
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="gc-min"
              className="text-base font-medium flex items-center gap-2"
            >
              <Percent className="w-4 h-4 text-primary" />
              GC Content (%)
            </Label>
            <div className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      id="gc-min"
                      type="number"
                      value={gcMin}
                      onChange={(e) => setGcMin(Number(e.target.value))}
                      min="20"
                      max="80"
                      step="0.1"
                      placeholder="40"
                      className="font-mono text-sm max-w-xs rounded-lg border border-input bg-background/50 shadow-sm focus:ring-2 focus:ring-primary hover:border-primary/50 transition"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    Minimum GC content (20–80%). Default: 40
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      id="gc-max"
                      type="number"
                      value={gcMax}
                      onChange={(e) => setGcMax(Number(e.target.value))}
                      min="20"
                      max="80"
                      step="0.1"
                      placeholder="60"
                      className="font-mono text-sm max-w-xs rounded-lg border border-input bg-background/50 shadow-sm focus:ring-2 focus:ring-primary hover:border-primary/50 transition"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    Maximum GC content (20–80%). Default: 60
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleSubmit}
            disabled={loading || !sequence.trim()}
            variant="primary"
            className="rounded-lg shadow-md hover:shadow-lg transition"
          >
            {loading ? (
              <>
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                Designing Primers...
              </>
            ) : (
              <>
                <Dna className="w-4 h-4 mr-2" />
                Design Primers
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handlePaste}
            className="rounded-lg shadow-sm hover:shadow-md transition"
          >
            <FileText className="w-4 h-4 mr-2" />
            Paste from Clipboard
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              className="relative rounded-lg shadow-sm hover:shadow-md transition"
            >
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

          <Button
            variant="secondary"
            onClick={loadSampleData}
            className="rounded-lg shadow-sm hover:shadow-md transition"
          >
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
  );
};

export default SequenceInput;
