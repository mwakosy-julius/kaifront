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
import { Clipboard } from "lucide-react";
import { Assembly, AssemblyResult } from "@/lib/services/tools/assembly";

interface AssemblyResultsProps {
  result: AssemblyResult | null;
}

const AssemblyResults: React.FC<AssemblyResultsProps> = ({ result }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    if (result?.assembled_sequence) {
      await Assembly.copyToClipboard(result.assembled_sequence);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!result) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Assembly Results</CardTitle>
        <CardDescription>
          Analysis results for your DNA fragments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead>Assembled Sequence</TableHead>
              <TableHead>Fragment Count</TableHead>
              <TableHead>Minimum Overlap</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-600 hover:bg-gray-200">
              <TableCell className="font-mono text-sm">
                {result.assembled_sequence}
              </TableCell>
              <TableCell>{result.fragment_count}</TableCell>
              <TableCell>{result.min_overlap}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  aria-label="Copy assembled sequence"
                >
                  <Clipboard className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy Sequence"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssemblyResults;
