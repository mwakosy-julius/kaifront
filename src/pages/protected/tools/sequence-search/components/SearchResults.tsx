import React from "react";
<<<<<<< HEAD
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
=======
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
>>>>>>> 07015f7 (sequence search)
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

  const sequencesResults = results.sequence_results && typeof results.sequence_results.sequences === "string"
    ? parseFasta(results.sequence_results.sequences)
    : [];
  
  return (
    <motion.div
      className="max-w-6xl mx-auto mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white-700 border-none">
        <CardHeader>
<<<<<<< HEAD
          <CardTitle className="text-2xl font-bold text-cyan-400">
            Search Results
          </CardTitle>
          <CardDescription className="text-gray-300">
            Gene and protein sequences from NCBI
          </CardDescription>
=======
          <CardTitle className="text-2xl font-bold text-primary">Search Results</CardTitle>    
>>>>>>> 07015f7 (sequence search)
        </CardHeader>
        <CardContent>
          {results.sequence_results.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Gene Search Error</AlertTitle>
              <AlertDescription>{results.sequence_results.error}</AlertDescription>
            </Alert>
          )}
<<<<<<< HEAD
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
=======
          {sequencesResults.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-600">
                  <TableHead className="text-black">Header</TableHead>
                  <TableHead className="text-black">Sequence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sequencesResults.map((seq, index) => (
                  <TableRow key={`gene-${index}`} className="border-gray-600 hover:bg-gray-200">
                    <TableCell className="text-black">{seq.header}</TableCell>
                    <TableCell className="text-black font-mono text-sm break-all">{seq.sequence}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {sequencesResults.length === 0 && !results.sequence_results.error && (
            <p className="text-gray-300">No sequences found.</p>
          )}
>>>>>>> 07015f7 (sequence search)
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchResults;
