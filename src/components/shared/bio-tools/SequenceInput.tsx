import React from "react";
import { RefreshCcw } from "lucide-react";

// local imports
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface SequenceInputProps {
  sequence: string;
  setSequence: (sequence: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
  label?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  height?: string;
  helperText?: string;
}

const SequenceInput: React.FC<SequenceInputProps> = ({
  sequence,
  setSequence,
  onSubmit,
  isLoading = false,
  placeholder = "Enter DNA or RNA sequence (e.g., ATGCAATTCGCTA)",
  label = "Enter DNA/RNA Sequence",
  buttonText,
  buttonIcon,
  height = "h-32",
  helperText = "Paste a DNA or RNA sequence for analysis",
}) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">{label}</p>
        <Textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder={placeholder}
          className={`${height} font-mono`}
        />
        {helperText && (
          <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
      {(buttonIcon || buttonText) && (
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
                {buttonText === "Analyze Sequence"
                  ? "Analyzing..."
                  : "Processing..."}
              </>
            ) : (
              <>
                {buttonIcon}
                {buttonText}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SequenceInput;
