import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  AlertCircle,
  Dna,
  Bug,
  Database,
  BookOpen,
  Share2,
} from "lucide-react";

// local imports
import { Badge } from "@/components/ui/badge";
import StatsGrid from "./components/StatsGrid";
import { Separator } from "@/components/ui/separator";
import TaxonomyChart from "./components/TaxonomyChart";
import TaxonomyTable from "./components/TaxonomyTable";
import SequenceInput from "./components/SequenceInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  analyzeMetagenomics,
  MetagenomicsResponse,
} from "@/lib/services/tools/metagenomics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Metagenomics: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [results, setResults] = useState<MetagenomicsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stats = [
    {
      label: "Algorithm",
      value: "k-mer Analysis",
      icon: Dna,
    },
    {
      label: "Data Type",
      value: "Metagenomic Reads",
      icon: Bug,
    },
    {
      label: "Database",
      value: "RefSeq & GTDB",
      icon: Database,
    },
  ];

  const handleAnalyze = async () => {
    setError("");
    setResults(null);
    setLoading(true);

    try {
      const response = await analyzeMetagenomics(sequence);
      setResults(response);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail ||
          "Failed to analyze metagenomics data"
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
                <Bug className="w-8 h-8" />
                MetaGenome Explorer
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Analyze metagenomic sequence data to identify microbial
                community composition
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

          <SequenceInput
            sequence={sequence}
            setSequence={setSequence}
            onSubmit={handleAnalyze}
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
                This tool analyzes metagenomic DNA sequences to identify the
                microbial composition of your sample. It uses k-mer-based
                taxonomic classification against reference databases.
              </p>
              <p>
                Paste raw metagenomic reads or processed sequences for analysis.
                For best results, ensure quality reads with minimal
                contamination.
              </p>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {results && (
        <div className="mt-6 space-y-6">
          <StatsGrid stats={results.stats} />
          <TaxonomyChart taxa={results.taxa} />
          <TaxonomyTable details={results.details} />
        </div>
      )}
    </div>
  );
};

export default Metagenomics;
