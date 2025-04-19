import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, RefreshCcw } from "lucide-react";

interface SequenceInputProps {
  sequence: string;
  setSequence: (sequence: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Enter DNA Sequence</p>
        <Textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="Enter DNA sequence (e.g., ATGCAATTCGCTA)"
          className="h-32 font-mono"
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !sequence.trim()}
          variant="primary"
          size="lg"
        >
          {isLoading ? (
            <>
              <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Analyze Sequence
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SequenceInput;
