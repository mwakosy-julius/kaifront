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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { SearchResponse } from "@/lib/services/tools/sequence_search";

interface SearchResultsProps {
  results: SearchResponse | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results) {
    return null;
  }

  const parseFasta = (fasta: string) => {
    const sequences = fasta.split(">").filter((s) => s.trim());
    return sequences.map((seq) => {
      const [header, ...body] = seq.split("\n");
      return { header, sequence: body.join("") };
    });
  };

  const geneSequences = results.gene_results
    ? parseFasta(results.gene_results)
    : [];
  const proteinSequences = results.protein_results
    ? parseFasta(results.protein_results.sequences)
    : [];

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-700 border-none shadow-[0_0_12px_#00f6ff]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-400">
            Search Results
          </CardTitle>
          <CardDescription className="text-gray-300">
            Gene and protein sequences from NCBI
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results.gene_results.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Gene Search Error</AlertTitle>
              <AlertDescription>{results.gene_results.error}</AlertDescription>
            </Alert>
          )}
          {geneSequences.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-white mb-2">
                Gene Sequences
              </h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600">
                    <TableHead className="text-white">Header</TableHead>
                    <TableHead className="text-white">Sequence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {geneSequences.map((seq, index) => (
                    <TableRow
                      key={`gene-${index}`}
                      className="border-gray-600 hover:bg-gray-600"
                    >
                      <TableCell className="text-gray-300">
                        {seq.header}
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono text-sm">
                        {seq.sequence}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          {results.protein_results.error && (
            <Alert variant="destructive" className="mt-4 mb-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Protein Search Error</AlertTitle>
              <AlertDescription>
                {results.protein_results.error}
              </AlertDescription>
            </Alert>
          )}
          {proteinSequences.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                Protein Sequences
              </h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-600">
                    <TableHead className="text-white">Header</TableHead>
                    <TableHead className="text-white">Sequence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proteinSequences.map((seq, index) => (
                    <TableRow
                      key={`protein-${index}`}
                      className="border-gray-600 hover:bg-gray-600"
                    >
                      <TableCell className="text-gray-300">
                        {seq.header}
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono text-sm">
                        {seq.sequence}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          {geneSequences.length === 0 &&
            proteinSequences.length === 0 &&
            !results.gene_results.error &&
            !results.protein_results.error && (
              <p className="text-gray-300">No sequences found.</p>
            )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchResults;
