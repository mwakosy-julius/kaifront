import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

interface MotifPosition {
  sequence: string;
  position: number;
  motif: string;
}

interface MotifResponse {
  consensus: string;
  score: number;
  motif_length: number;
  positions: MotifPosition[];
}

interface MotifResultsProps {
  response: MotifResponse;
  fastaInput: string;
}

const MotifResults: React.FC<MotifResultsProps> = ({
  response,
  fastaInput,
}) => {
  // Parse FASTA for sequence display
  const parseFasta = (fasta: string): Record<string, string> => {
    const sequences: Record<string, string> = {};
    let currentHeader = "";
    const lines = fasta.trim().split("\n");

    for (const line of lines) {
      if (line.startsWith(">")) {
        currentHeader = line.substring(1).trim();
      } else if (currentHeader) {
        sequences[currentHeader] =
          (sequences[currentHeader] || "") + line.trim();
      }
    }

    return sequences;
  };

  // Nucleotide color mapping
  const getNucleotideColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case "A":
        return "text-red-500";
      case "T":
        return "text-green-500";
      case "C":
        return "text-blue-500";
      case "G":
        return "text-yellow-500";
      default:
        return "text-gray-400";
    }
  };

  const sequences = parseFasta(fastaInput);

  // Function to export results as CSV
  const exportAsCSV = () => {
    const headers = ["Sequence", "Position", "Motif"];
    const rows = response.positions.map(
      (p) => `${p.sequence},${p.position},${p.motif}`
    );
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "motif_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Function to render sequence with highlighted motifs
  const renderSequence = (seqId: string, sequence: string) => {
    const positions = response.positions
      .filter((p) => p.sequence === seqId)
      .map((p) => ({
        start: p.position - 1,
        end: p.position - 1 + p.motif.length,
      }));

    const result: JSX.Element[] = [];
    let lastEnd = 0;

    // Sort positions to handle overlaps
    positions.sort((a, b) => a.start - b.start);

    positions.forEach(({ start, end }) => {
      if (start > lastEnd) {
        // Add non-highlighted segment
        result.push(
          <span key={`${seqId}-normal-${lastEnd}`}>
            {sequence
              .substring(lastEnd, start)
              .split("")
              .map((char, i) => (
                <span
                  key={`${seqId}-${lastEnd + i}`}
                  className={getNucleotideColor(char)}
                >
                  {char}
                </span>
              ))}
          </span>
        );
      }

      // Add highlighted segment
      result.push(
        <span
          key={`${seqId}-motif-${start}`}
          className="bg-primary/15 font-bold rounded px-0.5"
        >
          {sequence
            .substring(start, end)
            .split("")
            .map((char, i) => (
              <span
                key={`${seqId}-h-${start + i}`}
                className={getNucleotideColor(char)}
              >
                {char}
              </span>
            ))}
        </span>
      );

      lastEnd = end;
    });

    // Add remaining sequence
    if (lastEnd < sequence.length) {
      result.push(
        <span key={`${seqId}-normal-end`}>
          {sequence
            .substring(lastEnd)
            .split("")
            .map((char, i) => (
              <span
                key={`${seqId}-${lastEnd + i}`}
                className={getNucleotideColor(char)}
              >
                {char}
              </span>
            ))}
        </span>
      );
    }

    return result;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Motif Analysis Results</CardTitle>
        <CardDescription>
          Discovered sequence motifs and their positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border rounded bg-muted/20">
          <h3 className="mb-2 text-lg font-semibold">Consensus Motif</h3>
          <div className="flex items-center gap-2">
            <div className="flex p-2 overflow-x-auto font-mono text-lg border rounded bg-muted/30">
              {response.consensus.split("").map((base, idx) => (
                <span
                  key={idx}
                  className={`${getNucleotideColor(base)} px-0.5`}
                >
                  {base}
                </span>
              ))}
            </div>
            <Badge variant="outline">Score: {response.score.toFixed(2)}</Badge>
            <Badge variant="outline">Length: {response.motif_length}</Badge>
          </div>
        </div>

        <Tabs defaultValue="motifs">
          <TabsList>
            <TabsTrigger value="motifs">Motif Positions</TabsTrigger>
            <TabsTrigger value="sequences">Sequences</TabsTrigger>
          </TabsList>

          <TabsContent value="motifs" className="space-y-4">
            <div className="border rounded">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sequence</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Motif</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {response.positions.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.sequence}</TableCell>
                      <TableCell>{p.position}</TableCell>
                      <TableCell className="font-mono">
                        {p.motif.split("").map((base, i) => (
                          <span key={i} className={getNucleotideColor(base)}>
                            {base}
                          </span>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={exportAsCSV}>
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sequences" className="space-y-4">
            <div className="p-4 overflow-x-auto font-mono text-sm border rounded bg-muted/20">
              {Object.entries(sequences).map(([id, seq]) => (
                <div key={id} className="mb-4">
                  <div className="mb-1 font-semibold">{`>${id}`}</div>
                  <div className="break-all">{renderSequence(id, seq)}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-sm text-muted-foreground">
          <p>
            Motifs are shown highlighted in the sequences. The consensus
            sequence represents the most conserved pattern across all identified
            motif instances.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotifResults;
