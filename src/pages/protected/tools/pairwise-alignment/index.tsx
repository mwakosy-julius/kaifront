import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Dna,
  Calculator,
  Settings2,
  Info,
  Binary,
  BookOpen,
  Share2,
} from "lucide-react";
import { AlignmentForm } from "./form";
import { AlignmentResults } from "./results";
import { alignSequences } from "./api";
import { AlignmentRequest, AlignmentResponse } from "./types";

const PairwiseAlignment = () => {
  const [results, setResults] = useState<AlignmentResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      label: "Max Sequence Length",
      value: "100,000 bp",
      icon: Calculator,
    },
    {
      label: "Supported Bases",
      value: "A, T, C, G",
      icon: Binary,
    },
    {
      label: "Parameters",
      value: "Configurable",
      icon: Settings2,
    },
  ];

  const handleSubmit = async (data: AlignmentRequest) => {
    setLoading(true);
    setError("");

    try {
      const response = await alignSequences(data);
      setResults(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                  <Dna className="w-8 h-8" />
                  DNA Sequence Alignment Tool
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                High-performance pairwise sequence alignment using dynamic
                programming algorithms
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

          <AlignmentForm onSubmit={handleSubmit} loading={loading} />

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <div className="space-y-1">
              <p>
                This tool implements industry-standard alignment algorithms for
                DNA sequence analysis. Supports both global alignment
                (Needleman-Wunsch) and local alignment (Smith-Waterman) with
                configurable scoring parameters.
              </p>
              <p>
                Input sequences must contain only valid nucleotide bases (A, T,
                C, G). Max sequence length: 100,000 base pairs.
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>

      {results && <AlignmentResults results={results} />}
    </div>
  );
};

export default PairwiseAlignment;
