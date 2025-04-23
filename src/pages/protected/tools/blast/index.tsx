import { useState } from "react";
import { runBlast } from "@/lib/services/tools/blast";
import { BlastResult } from "@/lib/services/tools/blast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Dna, Calculator, AlertCircle } from "lucide-react"; // Import icons for better UX
import { Textarea } from "@/components/ui/textarea";

const BlastTool: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [results, setResults] = useState<BlastResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Tool statistics to display in the header
  const stats = [
    {
      label: "Analysis Tool",
      value: "BLAST",
      icon: Calculator,
    },
    {
      label: "Supported Sequences",
      value: "Protein/DNA",
      icon: Dna,
    },
    {
      label: "Results",
      value: "Similar Sequences",
      icon: Calculator,
    },
  ];

  const handleRunBlast = async () => {
    if (!sequence) {
      setError("Please provide a sequence.");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous error

    try {
      const data = await runBlast(sequence);
      setResults(data.results); // Assuming the `results` field contains the necessary output
    } catch (err) {
      setError("An error occurred while fetching BLAST results.");
      console.error("BLAST error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* Main Card for BLAST Tool */}
      <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                <Dna className="w-8 h-8" />
                BLAST Search Tool
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Analyze your sequence against a database for similar sequences
              </CardDescription>
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

          {/* Sequence Input and Run Button */}
          <Textarea
            className="w-full p-3 border rounded-md mb-4"
            placeholder="Enter your sequence here..."
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            rows={5}
          />
          <Button
            variant={"outline"}
            className="w-full py-2"
            onClick={handleRunBlast}
            disabled={loading}
          >
            {loading ? "Running BLAST..." : "Run BLAST"}
          </Button>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Display */}
      {results && !error && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>BLAST Results</CardTitle>
            <CardDescription>
              Analysis results for your sequence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border">
              <h3 className="text-xl font-semibold">BLAST Results</h3>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlastTool;
