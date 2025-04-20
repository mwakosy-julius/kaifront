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
  Dna,
  Calculator,
  BookOpen,
  Share2,
  Database,
} from "lucide-react";
import SequenceInput from "./components/SequenceInput";
import AlignmentDisplay from "./components/AlignmentDisplay";
import AlignmentHeatmap from "./components/AlignmentHeatmap";
import {
  alignSequences,
  MultipleAlignmentRequest,
} from "@/lib/services/tools/multiple_alignment";

const MultipleAlignment: React.FC = () => {
  const [sequences, setSequences] = useState("");
  const [seqType, setSeqType] = useState<"dna" | "protein">("dna");
  const [alignment, setAlignment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      label: "Algorithm",
      value: "MUSCLE",
      icon: Calculator,
    },
    {
      label: "Sequence Types",
      value: "DNA & Protein",
      icon: Dna,
    },
    {
      label: "Output Format",
      value: "CLUSTAL & CSV",
      icon: Database,
    },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setAlignment("");

    try {
      const request: MultipleAlignmentRequest = {
        sequences,
        seq_type: seqType,
      };

      const data = await alignSequences(request);
      setAlignment(data.alignment);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || "Failed to fetch alignment"
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
                Multiple Alignment Analysis
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Multiple sequence alignment tool for DNA and protein sequences
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
            sequences={sequences}
            setSequences={setSequences}
            seqType={seqType}
            setSeqType={setSeqType}
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

      {alignment && (
        <>
          <AlignmentDisplay alignment={alignment} />
          <AlignmentHeatmap alignment={alignment} />
        </>
      )}
    </div>
  );
};

export default MultipleAlignment;
