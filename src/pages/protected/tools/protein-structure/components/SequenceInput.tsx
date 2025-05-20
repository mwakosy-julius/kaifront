import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dna, Calculator, BookOpen, Share2, Upload, FileText, RefreshCcw, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface SequenceInputProps {
  sequence: string;
  setSequence: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  handlePredict: () => void;
  loading: boolean;
  error: string | null;
}

const stats = [
  { label: "Analysis Tool", value: "AlphaFold", icon: BookOpen },
  { label: "Supported Sequences", value: "Protein", icon: Dna },
  { label: "Results", value: "3D Structure", icon: Calculator },
];

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  // file,
  setFile,
  handlePredict,
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

  const sampleProtein = ">Sample_Protein\nMVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR";

  const loadSampleData = () => {
    setSequence(sampleProtein);
    setFile(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto space-y-6"
    >
      <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
            <Dna className="w-8 h-8" />
            Protein Structure Predictor
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Predict the 3D structure of a protein from its amino acid sequence in FASTA format
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
            <Label htmlFor="sequence">Enter Amino Acid Sequence in FASTA Format</Label>
            <Textarea
              id="sequence"
              value={sequence}
              onChange={(e) => {
                setSequence(e.target.value);
                setFile(null);
              }}
              placeholder={`Enter sequence in FASTA format:\n${sampleProtein}`}
              className="min-h-[200px] font-mono text-sm"
              disabled={loading}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handlePredict}
              disabled={loading || !sequence.trim()}
              variant="primary"
              className="transition-all duration-300 hover:[box-shadow:_0_0_12px_#ff0000]"
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Dna className="w-4 h-4 mr-2" />
                  Predict Structure
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