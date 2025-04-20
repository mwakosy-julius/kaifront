import React, { useState } from "react";
import { AxiosError } from "axios";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Archive,
  Zap,
  FileText,
  Info,
  BookOpen,
  Share2,
  RefreshCcw,
  Code,
} from "lucide-react";
import {
  compressData,
  CompressionRequest,
  CompressionResponse,
} from "@/lib/services/tools/data_compression";

const DataCompression: React.FC = () => {
  const [sequence, setSequence] = useState<string>(
    ">seq1\nATCGATCGATCGATCG\n>seq2\nATGGATCGATCGATCG"
  );
  const [method, setMethod] = useState<"run_length" | "delta">("run_length");
  const [reference, setReference] = useState<string>("");
  const [result, setResult] = useState<CompressionResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompress = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    const request: CompressionRequest = {
      sequence,
      method,
      ...(method === "delta" && reference ? { reference } : {}),
    };

    try {
      const response = await compressData(request);
      setResult(response);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to compress data");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Run-Length Encoding",
      value: "Repetitive Sequences",
      icon: Archive,
    },
    {
      label: "Delta Compression",
      value: "Similar Sequences",
      icon: Code,
    },
    {
      label: "Format",
      value: "FASTA & Raw DNA",
      icon: FileText,
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
                  <Archive className="w-8 h-8" />
                  Genomic Data Compression
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Compress DNA sequences with specialized algorithms for genomic
                data
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

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                FASTA Sequence
              </label>
              <Textarea
                className="h-40 font-mono"
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                placeholder="Enter FASTA or raw DNA sequence"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Compression Method
                </label>
                <Select
                  value={method}
                  onValueChange={(value) =>
                    setMethod(value as "run_length" | "delta")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select compression method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="run_length">
                      Run-Length Encoding
                    </SelectItem>
                    <SelectItem value="delta">Delta Compression</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {method === "delta" && (
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Reference Sequence
                  </label>
                  <Textarea
                    className="font-mono"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Enter reference sequence for delta compression"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleCompress}
                disabled={loading}
                variant="primary"
                size="lg"
              >
                {loading ? (
                  <>
                    <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Compress Data
                  </>
                )}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <div className="space-y-1">
              <p>
                This tool provides specialized compression algorithms for DNA
                sequence data. Run-length encoding works best for sequences with
                repetitive patterns, while delta compression is ideal when you
                have a similar reference sequence.
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Compression Results</CardTitle>
            <CardDescription>
              {result.method === "run_length"
                ? "Run-length encoding compression results"
                : "Delta compression results against reference sequence"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium">Original Sequence</p>
                <div className="p-3 overflow-auto font-mono text-xs whitespace-pre-wrap rounded bg-muted/50 max-h-48">
                  {result.original}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Compressed Data</p>
                <div className="p-3 overflow-auto font-mono text-xs whitespace-pre-wrap rounded bg-muted/50 max-h-48">
                  {result.compressed}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 mt-4 rounded bg-muted/30">
              <div className="text-center">
                <p className="text-sm font-medium">Compression Ratio</p>
                <p className="text-3xl font-bold text-primary">
                  {result.compression_ratio.toFixed(2)}x
                </p>
                <p className="text-xs text-muted-foreground">
                  Using{" "}
                  {result.method === "run_length"
                    ? "Run-Length Encoding"
                    : "Delta Compression"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default DataCompression;
