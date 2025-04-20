import { useState } from "react";
import {
  AlertCircle,
  Dna,
  BarChart,
  Dices,
  Info,
  BookOpen,
  Share2,
  RefreshCcw,
} from "lucide-react";

// local imports
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SequenceInput from "./components/SequenceInput";
import NucleotideTable from "./components/NucleotideTable";
import AminoAcidPieChart from "./components/AminoAcidPieChart";
import NucleotideBarChart from "./components/NucleotideBarChart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  visualizeDNA,
  DNAVisualizationResponse,
  NucleotideDataPoint,
  AminoAcidDataPoint,
  AminoAcids,
} from "@/lib/services/tools/dna_visualization";

const DNAVisualization = () => {
  const [sequence, setSequence] = useState("");
  const [data, setData] = useState<DNAVisualizationResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Convert API response to Recharts-friendly format
  function formatNucleotideData(
    response: DNAVisualizationResponse
  ): NucleotideDataPoint[] {
    return Object.entries(response.dna_counts).map(([name, count]) => ({
      name: name as "A" | "T" | "G" | "C",
      count,
      percentage: response.dna_percentages[name as "A" | "T" | "G" | "C"],
    }));
  }

  function formatAminoAcidData(
    response: DNAVisualizationResponse
  ): AminoAcidDataPoint[] {
    return Object.entries(response.amino_acid_counts).map(([name, count]) => ({
      name,
      count,
      percentage: response.amino_acid_percentages[name as AminoAcids],
    }));
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await visualizeDNA(sequence);
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Visualization",
      value: "Charts & Tables",
      icon: BarChart,
    },
    {
      label: "Nucleotides",
      value: "A, T, C, G",
      icon: Dna,
    },
    {
      label: "Protein Coding",
      value: "Amino Acid Analysis",
      icon: Dices,
    },
  ];

  return (
    <div className="container mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                  <Dna className="w-8 h-8" />
                  DNA Visualization
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Comprehensive DNA sequence analysis and visualization tool
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
            onSubmit={handleSubmit}
            isLoading={loading}
          />

          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <RefreshCcw className="w-5 h-5 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing sequence...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
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
                This tool analyses DNA sequences to provide nucleotide
                composition, transcription to RNA, translation to amino acids,
                and comprehensive visualizations of sequence data.
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>

      {data && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                DNA composition, transcription and translation data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 p-4 rounded md:grid-cols-3 bg-muted/30">
                <div className="space-y-1">
                  <p className="text-sm font-medium">RNA Transcript</p>
                  <p className="p-2 font-mono text-xs rounded bg-muted">
                    {data.transcript}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Amino Acids</p>
                  <p className="p-2 font-mono text-xs rounded bg-muted">
                    {data.amino_acids}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">GC Content</p>
                  <p className="flex items-center justify-center h-full text-lg font-bold text-primary">
                    {data.gc_content}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <NucleotideTable counts={data.dna_counts} />
                <NucleotideBarChart data={formatNucleotideData(data)} />
              </div>

              <Separator />

              <AminoAcidPieChart data={formatAminoAcidData(data)} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DNAVisualization;
