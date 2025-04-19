import { useState } from "react";
import { GCContentForm } from "./form";
import { GCContentResults } from "./results";
import { analyzeGCContent } from "@/lib/services/tools/gc_content";
import { GCContentResponse } from "./types/gc-content";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Dna, AlertCircle } from "lucide-react";
import { GCContentRequest } from "./schema";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function GCContentDashboard() {
  const [results, setResults] = useState<GCContentResponse | null>({
    total_length: 0,
    nucleotides: {
      A: { count: 0, percentage: 0 },
      T: { count: 0, percentage: 0 },
      G: { count: 0, percentage: 0 },
      C: { count: 0, percentage: 0 },
    },
    gc_content: [],
    positions: [],
    plot_data: [],
    window_size: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: GCContentRequest) => {
    setLoading(true);
    setError("");
    try {
      const response = await analyzeGCContent(data);
      setResults(response);
    } catch {
      setError("Failed to analyze GC content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 p-3 mx-auto max-w-7xl">
      <div className="col-span-4">
        <Card className="!bg-background/60 backdrop-blur-sm border-none shadow-none">
          <CardHeader>
            <div className="flex items-center gap-1">
              <Dna className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl font-bold md:text-3xl text-primary">
                GC Content Analysis
              </CardTitle>
            </div>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              Analyze DNA sequences for GC content using advanced visualization
              tools.
            </CardDescription>
          </CardHeader>
          <div className="p-4">
            <GCContentForm onSubmit={handleSubmit} loading={loading} />
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </Card>
      </div>

      <div className="col-span-8">
        {results && <GCContentResults results={results} />}
      </div>
    </div>
  );
}
