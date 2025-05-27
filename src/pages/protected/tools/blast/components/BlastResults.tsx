import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlastResult } from "@/lib/services/tools/blast";

interface BlastResultsProps {
  results: BlastResult[] | null;
}

const BlastResults: React.FC<BlastResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>BLAST Results</CardTitle>
        <CardDescription>Analysis results for your sequence</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead className="text-white">Organism</TableHead>
              <TableHead className="text-white">Hit ID</TableHead>
              <TableHead className="text-white">Identity (%)</TableHead>
              {/* <TableHead className="text-white">Accession</TableHead> */}
              {/* <TableHead className="text-white">Query Coverage (%)</TableHead>
              <TableHead className="text-white">E-value</TableHead>
              <TableHead className="text-white">Bit Score</TableHead>
              <TableHead className="text-white">Gaps</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index} className="border-gray-600 hover:bg-gray-600">
                <TableCell className="text-gray-300">{result.organism}</TableCell>
                <TableCell className="text-gray-300">{result.hit_id}</TableCell>
                <TableCell className="text-gray-300">{result.percentage_match.toFixed(2)}</TableCell>
                {/* <TableCell className="text-gray-300">{result.accession}</TableCell> */}
                {/* <TableCell className="text-gray-300">{result.query_coverage.toFixed(2)}</TableCell>
                <TableCell className="text-gray-300">{result.evalue.toExponential(2)}</TableCell>
                <TableCell className="text-gray-300">{result.bit_score.toFixed(2)}</TableCell>
                <TableCell className="text-gray-300">{result.gaps}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlastResults;