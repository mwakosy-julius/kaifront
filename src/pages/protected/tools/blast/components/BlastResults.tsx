import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BlastResult } from "@/lib/services/tools/blast";

const BlastResults: React.FC<BlastResult> = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>BLAST Results</CardTitle>
        <CardDescription>Analysis results for your sequence</CardDescription>
      </CardHeader>
      {/* <pre>
        <code>
          {JSON.stringify(results, null, 2)}
        </code>
      </pre> */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead className="">Organism</TableHead>
              <TableHead className="">Hit ID</TableHead>
              <TableHead className="">Identity (%)</TableHead>
              {/* <TableHead className="text-white">Accession</TableHead> */}
              {/* <TableHead className="text-white">Query Coverage (%)</TableHead>
              <TableHead className="text-white">E-value</TableHead>
              <TableHead className="text-white">Bit Score</TableHead>
              <TableHead className="text-white">Gaps</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index} className="border-gray-600 hover:bg-gray-200">
                <TableCell className="">{result.organism}</TableCell>
                <TableCell className="">{result.hit_id}</TableCell>
                <TableCell className="">{result.percentage_match}</TableCell>
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