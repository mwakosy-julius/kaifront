import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NucleotideTableProps {
  counts: { [key: string]: number };
}

const NucleotideTable: React.FC<NucleotideTableProps> = ({ counts }) => {
  const downloadCsv = () => {
    const csv = [
      "Nucleotide,Count",
      ...Object.entries(counts).map(([nuc, count]) => `${nuc},${count}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nucleotide_counts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Nucleotide Counts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nucleotide</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(counts).map(([nucleotide, count]) => (
                <TableRow key={nucleotide}>
                  <TableCell>{nucleotide}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadCsv}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </Button>
      </CardContent>
    </Card>
  );
};

export default NucleotideTable;
