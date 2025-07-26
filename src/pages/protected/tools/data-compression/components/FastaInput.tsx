import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
  FileText,
  BookOpen,
  Share2,
  Upload,
  RefreshCcw,
  Code,
  Zap,
} from "lucide-react";

interface FastaInputProps {
  fasta: string;
  setFasta: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  method: "run_length" | "delta";
  setMethod: React.Dispatch<React.SetStateAction<"run_length" | "delta">>;
  reference: string;
  setReference: React.Dispatch<React.SetStateAction<string>>;
  handleCompress: () => Promise<void>;
  loading: boolean;
  error: string;
}

export const FastaInput: React.FC<FastaInputProps> = ({
  fasta,
  setFasta,
  setFile,
  method,
  setMethod,
  reference,
  setReference,
  handleCompress,
  loading,
  error,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFasta(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFasta(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const loadSampleData = () => {
    setFasta(
      ">seq1\nATCGATCGATCGATCGATCGATCGATCG\n" +
        ">seq2\nATGGATCGATCGATCGATCGATCGATCG\n" +
        ">seq3\nATCGATCGATCGATCGATCGATCGATCG"
    );
    setReference("ATCGATCGATCGATCGATCGATCGATCA");
    setFile(null);
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
              value={fasta}
              onChange={(e) => setFasta(e.target.value)}
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

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleCompress}
              disabled={loading || !fasta.trim()}
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
            <Button variant="outline" onClick={handlePaste}>
              <FileText className="w-4 h-4 mr-2" />
              Paste from Clipboard
            </Button>

            <div className="relative">
              <Button variant="outline" className="relative">
                <Upload className="w-4 h-4 mr-2" />
                Upload FASTA File
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".fasta,.fa,.txt"
                  onChange={handleFileChange}
                />
              </Button>
            </div>

            <Button variant="secondary" onClick={loadSampleData}>
              Load Sample
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
    </Card>
  );
};
