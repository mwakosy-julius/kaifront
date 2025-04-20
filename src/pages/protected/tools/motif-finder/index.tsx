import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Search,
  BookOpen,
  Share2,
  Database,
  Dna,
} from "lucide-react";
import FastaInput from "./components/FastaInput";
import MotifResults from "./components/MotifResults";
import { findMotifs, MotifResponse } from "@/lib/services/tools/motif_finder";

const MotifFinder: React.FC = () => {
  const [fastaInput, setFastaInput] = useState<string>(
    ">seq1\nATCGATGCTAGCTAGC\n>seq2\nATGCTAGCTAGCATCG\n>seq3\nGCTAGCTAGCATCGAT"
  );
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<MotifResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const stats = [
    {
      label: "Algorithm",
      value: "MEME",
      icon: Search,
    },
    {
      label: "Sequence Types",
      value: "DNA & Protein",
      icon: Dna,
    },
    {
      label: "Output Format",
      value: "Motif Positions",
      icon: Database,
    },
  ];

  const handleFindMotifs = async () => {
    setError("");
    setResponse(null);
    setLoading(true);

    let inputData = fastaInput;
    if (file) {
      try {
        inputData = await file.text();
      } catch {
        setError("Failed to read file");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await findMotifs(inputData);
      setResponse(res);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to find motifs");
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
                <Search className="w-8 h-8" />
                Motif Finder
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Discover conserved sequence patterns across multiple DNA or
                protein sequences
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
            onSubmit={handleFindMotifs}
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
      </Card>

      {response && <MotifResults response={response} fastaInput={fastaInput} />}
    </div>
  );
};

export default MotifFinder;
