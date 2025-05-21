import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AxiosError } from "axios";
import {
  Variant,
  callVariants,
  VariantCallRequest,
} from "@/lib/services/tools/variant_calling";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
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
} from "lucide-react";

const VariantCaller: React.FC = () => {
  const [refFasta, setRefFasta] = useState<string>(">ref\nATCGATCGATCGATCG");
  const [sampleFasta, setSampleFasta] = useState<string>(
    ">sample\nATGGATCGATCGATCG"
  );
  const [variants, setVariants] = useState<Variant[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false); // New state to control results visibility

  const handleCallVariants = async () => {
    setError("");
    setVariants([]);
    setShowResults(false); // Hide results until new variants are retrieved
    setLoading(true);

    const request: VariantCallRequest = {
      ref_fasta: refFasta,
      sample_fasta: sampleFasta,
    };

    try {
      const response = await callVariants(request);
      setVariants(response.variants);
      setShowResults(true); // Show results after successful variant calling
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to call variants");
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
      label: "Detects",
      value: "SNPs, Indels",
      icon: Zap,
    },
    {
      label: "Input Format",
      value: "FASTA",
      icon: Dna,
    },
    {
      label: "Accuracy",
      value: "High Precision",
      icon: RefreshCcw,
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
                  Genomic Variant Caller
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Quickly identify SNPs, insertions, and deletions between
                reference and sample sequences
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Reference FASTA Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 text-sm font-medium">Reference</p>
              <Textarea
                className="font-mono h-24 rounded-sm !outline-none !ring-0 !shadow-none"
                value={refFasta}
                onChange={(e) => setRefFasta(e.target.value)}
                placeholder="Enter reference FASTA"
              />
            </motion.div>

            {/* Sample FASTA Input */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 text-sm font-medium">Sample</p>
              <Textarea
                className="font-mono h-24 rounded-sm !outline-none !ring-0 !shadow-none"
                value={sampleFasta}
                onChange={(e) => setSampleFasta(e.target.value)}
                placeholder="Enter sample FASTA"
              />
            </motion.div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleCallVariants}
              disabled={loading}
              size="lg"
              variant="primary"
              className="w-full rounded shadow-none"
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Calling Variants...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Call Variants
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
        </CardContent>
      </Card>

      <AnimatePresence>
        {showResults && variants.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Variants Detected</CardTitle>
                <CardDescription>
                  {variants.length} variant{variants.length !== 1 ? "s" : ""}{" "}
                  found between reference and sample
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Variant</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variants.map((v, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{v.position}</TableCell>
                        <TableCell
                          className={`font-mono ${getNucleotideColor(
                            v.reference
                          )}`}
                        >
                          {v.reference || "-"}
                        </TableCell>
                        <TableCell
                          className={`font-mono ${getNucleotideColor(
                            v.variant
                          )}`}
                        >
                          {v.variant || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              v.type === "SNP"
                                ? "secondary"
                                : v.type === "INSERTION"
                                ? "outline"
                                : "default"
                            }
                          >
                            {v.type}
                          </Badge>
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

export default VariantCaller;
