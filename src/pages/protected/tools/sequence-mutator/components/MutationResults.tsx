import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { MutationResult } from "@/lib/services/tools/sequence_mutator";
// import SequenceViewer from "react-sequence-viewer";

interface MutationResultsProps {
  result: MutationResult | null;
}

const MutationResults: React.FC<MutationResultsProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  const downloadFasta = () => {
    const fasta = `>Original\n${result.original_sequence}\n>Mutated\n${result.mutated_sequence}`;
    const blob = new Blob([fasta], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "mutated_sequence.fasta");
  };

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
            Mutation Results
          </CardTitle>
          <CardDescription className="text-gray-300">
            Mutated sequence and mutation details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-white">
              Original Sequence:{" "}
              <span className="font-mono">{result.original_sequence}</span>
            </p>
            <p className="text-white">
              Mutated Sequence:{" "}
              <span className="font-mono">{result.mutated_sequence}</span>
            </p>
            <p className="text-white">
              Mutation Count: {result.mutation_count}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Sequence Viewer
            </h3>
            <SequenceViewer
              sequence={result.mutated_sequence}
              title="Mutated Sequence"
              sequenceStyle={{ backgroundColor: "#1a1a1a", color: "#fff" }}
            />
          </div>
          {result.mutations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white">Mutations</h3>
              <ul className="text-white list-disc pl-5">
                {result.mutations.map((m, i) => (
                  <li key={i}>
                    Position {m.position}:{" "}
                    {m.from && m.to
                      ? `${m.from} → ${m.to}`
                      : m.inserted
                      ? `Inserted ${m.inserted}`
                      : `Deleted ${m.deleted}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            onClick={downloadFasta}
            className="bg-cyan-400 text-gray-900 hover:bg-cyan-600 hover:[box-shadow:_0_0_12px_#00f6ff]"
          >
            Download FASTA
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MutationResults;
