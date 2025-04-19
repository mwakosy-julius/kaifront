import React, { useState } from "react";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Dna,
  FileText,
  RefreshCw,
  Info,
  BookOpen,
  Share2,
  Download,
  Upload,
  RefreshCcw,
  Copy,
} from "lucide-react";
import { generateConsensus } from "@/lib/services/tools/consensus_maker";

const ConsensusMaker: React.FC = () => {
  const [fastaInput, setFastaInput] = useState<string>(
    ">seq1\nATCGATCGATCG\n>seq2\nATGGATCGATCG\n>seq3\nATCGATGGATCG"
  );
  const [file, setFile] = useState<File | null>(null);
  const [consensus, setConsensus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFastaInput(""); // Clear textarea if file is selected
    }
  };

  const handleGenerateConsensus = async () => {
    setError("");
    setConsensus("");
    setLoading(true);

    let inputData = fastaInput;
    if (file) {
      try {
        inputData = await file.text();
      } catch {
        setError("Failed to read the uploaded file");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await generateConsensus(inputData);
      setConsensus(response.consensus);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || "Failed to generate consensus"
      );
    } finally {
      setLoading(false);
    }
  };

  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case "A":
        return "text-green-500";
      case "T":
        return "text-red-500";
      case "C":
        return "text-blue-500";
      case "G":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const copyToClipboard = () => {
    if (consensus) {
      navigator.clipboard.writeText(consensus);
    }
  };

  const stats = [
    {
      label: "Input Format",
      value: "Multi-FASTA",
      icon: FileText,
    },
    {
      label: "Algorithm",
      value: "Majority Vote",
      icon: Dna,
    },
    {
      label: "Visualization",
      value: "Color-coded",
      icon: RefreshCw,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                  <Dna className="w-8 h-8" />
                  Consensus Sequence Generator
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Generate a consensus sequence from multiple DNA sequences by
                identifying the most common nucleotide at each position
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
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tool Statistics */}
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

          <Separator />

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Input FASTA Sequences
              </label>
              <Textarea
                className="h-40 font-mono"
                value={fastaInput}
                onChange={(e) => {
                  setFastaInput(e.target.value);
                  setFile(null); // Clear file if textarea is edited
                }}
                placeholder="Enter multiple FASTA sequences (e.g., >seq1&#10;ATCG...)"
                disabled={file !== null || loading}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Enter multiple sequences in FASTA format to generate a consensus
                sequence
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">
                Or Upload FASTA File
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-20 border border-dashed rounded-lg cursor-pointer bg-muted/20 border-border hover:bg-muted/30"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".fasta,.fa"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                size="lg"
                variant="primary"
                onClick={handleGenerateConsensus}
                disabled={loading || (!fastaInput && !file)}
              >
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
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <div className="space-y-1">
              <p>
                This tool generates a consensus sequence by identifying the most
                common nucleotide at each position across multiple sequences.
                The input must be in FASTA format with multiple sequences.
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>

      {consensus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Consensus Sequence</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const blob = new Blob([consensus], {
                        type: "text/plain",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "consensus_sequence.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    title="Download sequence"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Consensus sequence generated from{" "}
                {file ? file.name : "input sequences"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 overflow-x-auto font-mono text-sm rounded bg-muted/20">
                <div className="flex flex-wrap">
                  {consensus.split("").map((base, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: Math.min(idx * 0.002, 1),
                        duration: 0.2,
                      }}
                      className={`${getNucleotideColor(
                        base
                      )} font-mono transition-all hover:scale-125`}
                    >
                      {base}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">A (Adenine)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs">T (Thymine)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">C (Cytosine)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">G (Guanine)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ConsensusMaker;
