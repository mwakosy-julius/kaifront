import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

interface ConsensusResultsProps {
  consensus: string;
  fileName?: string;
}

const ConsensusResults: React.FC<ConsensusResultsProps> = ({
  consensus,
  fileName,
}) => {
  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case "A":
        return "text-green-500";
      case "T":
        return "text-red-500";
      case "C":
        return "text-blue-500";
      case "G":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(consensus);
  };

  const downloadSequence = () => {
    const blob = new Blob([consensus], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "consensus_sequence.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Consensus Sequence</span>
        </CardTitle>
        <CardDescription>
          Consensus sequence generated from {fileName || "input sequences"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 overflow-x-auto font-mono text-sm border rounded bg-muted/20">
          <div className="flex flex-wrap">
            {consensus.split("").map((base, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: Math.min(idx * 0.002, 1),
                  duration: 0.2,
                }}
                className={`${getNucleotideColor(
                  base
                )} font-mono transition-all hover:scale-125`}
              >
                {base}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
            <span className="text-xs">A (Adenine)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
            <span className="text-xs">T (Thymine)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs">C (Cytosine)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs">G (Guanine)</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={downloadSequence}
            title="Download sequence"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsensusResults;
