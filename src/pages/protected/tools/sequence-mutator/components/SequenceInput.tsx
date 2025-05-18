import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dna, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SequenceInputProps {
  sequence: string;
  setSequence: (value: string) => void;
  sequenceType: string;
  setSequenceType: (value: string) => void;
  mutationType: string;
  setMutationType: (value: string) => void;
  mutationRate: number;
  setMutationRate: (value: number) => void;
  handleMutate: () => void;
  loading: boolean;
  error: string | null;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  sequenceType,
  setSequenceType,
  mutationType,
  setMutationType,
  mutationRate,
  setMutationRate,
  handleMutate,
  loading,
  error,
}) => {
  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-[0_0_12px_#00f6ff]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Dna className="w-6 h-6" />
        Sequence Mutator
      </h2>
      <p className="text-gray-300 mb-4">
        Enter a DNA or protein sequence and specify mutation parameters.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="sequence" className="text-white">Sequence</Label>
          <Textarea
            id="sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder={sequenceType === "dna" ? "e.g., ATCGATCG" : "e.g., MVLSPADK"}
            className="bg-gray-700 text-white border-gray-600"
            rows={5}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="sequenceType" className="text-white">Sequence Type</Label>
          <Select onValueChange={setSequenceType} value={sequenceType}>
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Select sequence type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-white border-gray-600">
              <SelectItem value="dna">DNA</SelectItem>
              <SelectItem value="protein">Protein</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="mutationType" className="text-white">Mutation Type</Label>
          <Select onValueChange={setMutationType} value={mutationType}>
            <SelectTrigger className="bg-gray-700 text-white border-gray-600">
              <SelectValue placeholder="Select mutation type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-white border-gray-600">
              <SelectItem value="substitution">Substitution</SelectItem>
              <SelectItem value="insertion">Insertion</SelectItem>
              <SelectItem value="deletion">Deletion</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="mutationRate" className="text-white">Mutation Rate (0–1)</Label>
          <input
            id="mutationRate"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={mutationRate}
            onChange={(e) => setMutationRate(Number(e.target.value))}
            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2"
            disabled={loading}
          />
        </div>
        <Button
          onClick={handleMutate}
          className="bg-red-600 text-white hover:bg-red-700 w-full py-3 font-bold transition-all duration-300 hover:[box-shadow:_0_0_12px_#ff0000]"
          disabled={loading}
        >
          {loading ? "Mutating..." : "Mutate Sequence"}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </motion.div>
  );
};

export default SequenceInput;