import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Dna, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SequenceInputProps {
  sequence: string;
  setSequence: (value: string) => void;
  handlePredict: () => void;
  loading: boolean;
  error: string | null;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  handlePredict,
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
        Protein Structure Predictor
      </h2>
      <p className="text-gray-300 mb-4">
        Enter an amino acid sequence to predict its 3D structure.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="sequence" className="text-white">Amino Acid Sequence</Label>
          <Textarea
            id="sequence"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="e.g., MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR"
            className="bg-gray-700 text-white border-gray-600"
            rows={5}
            disabled={loading}
          />
        </div>
        <Button
          onClick={handlePredict}
          className="bg-red-600 text-white hover:bg-red-700 w-full py-3 font-bold transition-all duration-300 hover:[box-shadow:_0_0_12px_#ff0000]"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Structure"}
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