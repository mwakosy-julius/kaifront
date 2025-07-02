import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Dna,
  Calculator,
  BookOpen,
  Share2,
  Upload,
  FileText,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SequenceInputProps {
  onProcess: (dataType: string, file1: File, file2?: File) => void;
  loading: boolean;
  error: string | null;
}

const stats = [
  { label: "Analysis Tool", value: "FASTQ Quality Control", icon: Calculator },
  { label: "Supported Files", value: "FASTQ (Single/Paired-end)", icon: Dna },
  { label: "Results", value: "Quality Report", icon: Calculator },
];

const SequenceInput: React.FC<SequenceInputProps> = ({
  onProcess,
  loading,
  error,
}) => {
  const [dataType, setDataType] = useState<"single-end" | "paired-end">(
    "single-end",
  );
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string>("");

  const handleSubmit = () => {
    if (!file1) {
      setLocalError("Please upload the first FASTQ file.");
      return;
    }
    if (dataType === "paired-end" && !file2) {
      setLocalError(
        "Please upload the second FASTQ file for paired-end processing.",
      );
      return;
    }
    setLocalError("");
    onProcess(dataType, file1, file2 || undefined);
  };

  const handleFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile1(selectedFile);
    }
  };

  const handleFile2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile2(selectedFile);
    }
  };

  const handlePaste = async () => {
    // Placeholder: FASTQ files are typically not pasted, but included for UI consistency
    setLocalError(
      "Pasting FASTQ content is not supported. Please upload a file.",
    );
  };

  const loadSampleData = () => {
    // Placeholder: Sample data loading not implemented, as FASTQ files are typically uploaded
    setLocalError(
      "Sample FASTQ files are not available. Please upload your files.",
    );
  };

  return (
    <Card className="p-0 border-none shadow-none bg-background/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
          <Dna className="w-8 h-8" />
          FASTQ Quality Control Tool
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Analyze the quality of your FASTQ sequencing data
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

        <Separator className="bg-gray-600" />

        <div className="space-y-2">
          <Label>Data Type</Label>
          <RadioGroup
            defaultValue={dataType}
            value={dataType}
            onValueChange={(value) =>
              setDataType(value as "single-end" | "paired-end")
            }
            className="flex items-center space-x-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="single-end" id="single-end" />
              <Label htmlFor="single-end" className="cursor-pointer">
                Single-end
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="paired-end" id="paired-end" />
              <Label htmlFor="paired-end" className="cursor-pointer">
                Paired-end
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fastq-file1">FASTQ File 1</Label>
          <div className="relative">
            <Button variant="outline" className="relative">
              <Upload className="w-4 h-4 mr-2" />
              Upload FASTQ File 1
              <input
                type="file"
                id="fastq-file1"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".fastq,.fq"
                onChange={handleFile1Change}
              />
            </Button>
          </div>
        </div>

        {dataType === "paired-end" && (
          <div className="space-y-2">
            <Label htmlFor="fastq-file2">FASTQ File 2</Label>
            <div className="relative">
              <Button variant="outline" className="relative">
                <Upload className="w-4 h-4 mr-2" />
                Upload FASTQ File 2
                <input
                  type="file"
                  id="fastq-file2"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".fastq,.fq"
                  onChange={handleFile2Change}
                />
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleSubmit}
            disabled={
              loading || !file1 || (dataType === "paired-end" && !file2)
            }
            variant="primary"
          >
            {loading ? (
              <>
                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Dna className="w-4 h-4 mr-2" />
                Process Files
              </>
            )}
          </Button>

          <Button variant="outline" onClick={handlePaste} disabled>
            <FileText className="w-4 h-4 mr-2" />
            Paste from Clipboard
          </Button>

          <Button variant="secondary" onClick={loadSampleData} disabled>
            Load Sample
          </Button>
        </div>

        {(error || localError) && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || localError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SequenceInput;
