import React, { useState } from "react";
import {
  analyzeCodonUsage,
  CodonUsage,
} from "@/lib/services/tools/codon_usage";
import SequenceInput from "./components/SequenceInput";
import CodonTable from "./components/CodonTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Dna, 
  Calculator, 
  BookOpen,
  Share2, 
  Settings2 
} from "lucide-react";

const CodonUsageTool: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [codonUsage, setCodonUsage] = useState<CodonUsage>({});
  const [tableHtml, setTableHtml] = useState("");
  const [aminoAcidFilter, setAminoAcidFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      label: "Analyze Codons",
      value: "All 64 codons",
      icon: Calculator,
    },
    {
      label: "Supported Sequences",
      value: "DNA/RNA",
      icon: Dna,
    },
    {
      label: "Results",
      value: "Frequency & Usage",
      icon: Settings2,
    },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await analyzeCodonUsage(sequence);
      setCodonUsage(response.codon_usage);
      setTableHtml(response.table);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                <Dna className="w-8 h-8" />
                Codon Usage Analysis
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Analyze codon usage frequency and bias in DNA/RNA sequences
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

      {Object.keys(codonUsage).length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Codon Usage Analysis</CardTitle>
            <CardDescription>
              Analysis results for your sequence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodonTable
              tableHtml={tableHtml}
              codonUsage={codonUsage}
              aminoAcidFilter={aminoAcidFilter}
              setAminoAcidFilter={setAminoAcidFilter}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodonUsageTool;
