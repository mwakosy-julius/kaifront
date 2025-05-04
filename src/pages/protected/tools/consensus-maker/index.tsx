import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Dna,
  FileText,
  // Info,
  BookOpen,
  Share2,
  RefreshCw,
} from "lucide-react";
import FastaInput from "./components/FastaInput";
import ConsensusResults from "./components/ConsensusResults";
import { generateConsensus } from "@/lib/services/tools/consensus_maker";

const ConsensusMaker: React.FC = () => {
  const [fastaInput, setFastaInput] = useState<string>(
    ">seq1\nATCGATCGATCG\n>seq2\nATGGATCGATCG\n>seq3\nATCGATGGATCG"
  );
  const [file, setFile] = useState<File | null>(null);
  const [consensus, setConsensus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleGenerateConsensus = async () => {
    setError("");
    setConsensus("");
    setLoading(true);

    const inputData = fastaInput;

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

  return (
    <div className="container mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                <Dna className="w-8 h-8" />
                Consensus Sequence Generator
              </CardTitle>
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

          <FastaInput
            fasta={fastaInput}
            setFasta={setFastaInput}
            file={file}
            setFile={setFile}
            onSubmit={handleGenerateConsensus}
            loading={loading}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        {/* <CardFooter className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <div className="space-y-1">
              <p>
                This tool generates a consensus sequence by identifying the most
                common nucleotide at each position across multiple sequences.
                The input must be in FASTA format with multiple sequences.
              </p>
              <p>
                Ideal for primer design, reference sequence creation, and
                sequence analysis in molecular biology and bioinformatics
                applications.
              </p>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {consensus && (
        <ConsensusResults consensus={consensus} fileName={file?.name} />
      )}
    </div>
  );
};

export default ConsensusMaker;
