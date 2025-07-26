import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AxiosError } from "axios";
import {
  primerDesign,
  PrimerRequest,
  // Primer,
} from "@/lib/services/tools/primer_design";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Dna,
  Zap,
  BookOpen,
  Share2,
  RefreshCcw,
  Copy,
  Check,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Primer {
  sequence: string;
  tm: number;
  gc: number;
  length: number;
}

const PrimerDesigner: React.FC = () => {
  const [sequence, setSequence] = useState<string>(
    "ATCGATCGATCGATCGACGATCATGTGCTATCATGTCGATGCTAGTCGTAGTCGATGCTAGTCGATGCTAGCTATCGTAGCTATC",
  );
  const [primers, setPrimers] = useState<Primer[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Validate DNA sequence
  const validateSequence = (seq: string): boolean => {
    const validBases = /^[ATCGatcg]*$/;
    return seq.length > 0 && validBases.test(seq);
  };

  const handlePrimerDesign = async () => {
    setError("");
    setShowResults(false);
    setLoading(true);

    if (!validateSequence(sequence)) {
      setError("Invalid DNA sequence. Please use only A, T, C, G bases.");
      setLoading(false);
      return;
    }

    const request: PrimerRequest = { sequence };

    try {
      const response = await primerDesign(request);
      setPrimers(response.primers);
      setShowResults(true);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to design primer");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSequence("");
    setPrimers([]);
    setError("");
    setShowResults(false);
    setCopiedIndex(null);
  };

  // Copy primer sequence to clipboard
  const copyToClipboard = (primerSeq: string, index: number) => {
    navigator.clipboard.writeText(primerSeq);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case "A":
        return "text-green-500";
      case "T":
        return "text-red-500";
      case "G":
        return "text-blue-500";
      case "C":
        return "text-yellow-500";
      default:
        return "text-neutral-500";
    }
  };

  const stats = [
    {
      label: "Output",
      value: "Optimized Primers",
      icon: Zap,
    },
    {
      label: "Input",
      value: "DNA Sequence (FASTA)",
      icon: Dna,
    },
    {
      label: "Metrics",
      value: "Tm, GC%, Length",
      icon: RefreshCcw,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="border-none shadow-lg bg-background/80 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CardTitle className="flex items-center gap-3 text-4xl font-bold text-primary">
                  <Dna className="w-10 h-10" />
                  Primer Designer
                </CardTitle>
              </div>
              <CardDescription className="text-lg text-muted-foreground">
                Design optimized primers for your DNA sequences with high
                precision.
              </CardDescription>
              <div className="flex gap-3 mt-3">
                <Badge
                  variant="outline"
                  className="text-sm cursor-pointer hover:bg-primary/10"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Documentation
                </Badge>
                <Badge
                  variant="outline"
                  className="text-sm cursor-pointer hover:bg-primary/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Tool Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-lg bg-muted/30">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-4 rounded-full bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-base font-semibold">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-8">
            {/* DNA Sequence Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label
                htmlFor="sequence"
                className="mb-3 block text-base font-medium"
              >
                DNA Sequence
              </label>
              <Textarea
                id="sequence"
                className="font-mono h-32 rounded-lg border border-input bg-background/50 text-base resize-y"
                value={sequence}
                onChange={(e) => setSequence(e.target.value.toUpperCase())}
                placeholder="Enter DNA sequence (A, T, C, G only)"
                aria-describedby="sequence-help"
              />
              <p
                id="sequence-help"
                className="mt-2 text-sm text-muted-foreground"
              >
                Enter a valid DNA sequence using A, T, C, G bases.
              </p>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handlePrimerDesign}
              disabled={loading || !sequence}
              size="lg"
              variant="primary"
              className="w-full max-w-xs rounded-lg shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                  Designing Primers...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Design Primers
                </>
              )}
            </Button>
            <Button
              onClick={handleReset}
              disabled={loading}
              size="lg"
              variant="outline"
              className="w-full max-w-xs rounded-lg"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="w-5 h-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {showResults && primers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Designed Primers</CardTitle>
                <CardDescription>
                  Optimized primers for your input sequence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Primer Sequence</TableHead>
                      <TableHead>Tm (°C)</TableHead>
                      <TableHead>GC (%)</TableHead>
                      <TableHead>Length</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {primers.map((primer, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-mono text-sm">
                            {primer.sequence.split("").map((base, i) => (
                              <span
                                key={i}
                                className={getNucleotideColor(base)}
                              >
                                {base}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{primer.tm.toFixed(1)}</TableCell>
                        <TableCell>{primer.gc.toFixed(1)}</TableCell>
                        <TableCell>{primer.length}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(primer.sequence, index)
                                  }
                                  aria-label={`Copy primer ${index + 1} sequence`}
                                >
                                  {copiedIndex === index ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {copiedIndex === index
                                  ? "Copied!"
                                  : "Copy to clipboard"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrimerDesigner;
