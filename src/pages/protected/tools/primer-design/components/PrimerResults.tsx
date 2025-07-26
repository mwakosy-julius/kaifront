import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Primer } from "@/lib/services/tools/primer_design";

interface PrimerResultsProps {
  primers: Primer[];
}

const PrimerResults: React.FC<PrimerResultsProps> = ({ primers }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case "A":
        return "text-green-500";
      case "T":
        return "text-red-500";
      case "G":
        return "text-blue-500";
      case "C":
        return "text-yellow-500";
      default:
        return "text-neutral-500";
    }
  };

  const copyToClipboard = (primerSeq: string, index: number) => {
    navigator.clipboard.writeText(primerSeq);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!primers || primers.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Designed Primers</CardTitle>
        <CardDescription>
          Optimized primers for your input sequence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead>Primer Sequence</TableHead>
              <TableHead>Tm (°C)</TableHead>
              <TableHead>GC (%)</TableHead>
              <TableHead>Length</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {primers.map((primer, index) => (
              <TableRow
                key={index}
                className="border-gray-600 hover:bg-gray-200"
              >
                <TableCell>
                  <div className="font-mono text-sm">
                    {primer.sequence.split("").map((base, i) => (
                      <span key={i} className={getNucleotideColor(base)}>
                        {base}
                      </span>
                    ))}
                    {` (${primer.type})`}
                  </div>
                </TableCell>
                <TableCell>{primer.tm.toFixed(1)}</TableCell>
                <TableCell>{primer.gc.toFixed(1)}</TableCell>
                <TableCell>{primer.length}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(primer.sequence, index)
                          }
                          aria-label={`Copy primer ${index + 1} sequence`}
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {copiedIndex === index
                          ? "Copied!"
                          : "Copy to clipboard"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PrimerResults;
