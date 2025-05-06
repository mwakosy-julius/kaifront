import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { CompressionResponse } from "@/lib/services/tools/data_compression";

interface CompressionResultsProps {
  result: CompressionResponse | null;
}

export const CompressionResults: React.FC<CompressionResultsProps> = ({ result }) => {
  if (!result) return null;

  return (
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
  );
};