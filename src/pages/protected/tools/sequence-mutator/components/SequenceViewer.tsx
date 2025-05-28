import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Info, ArrowDown, Copy, Check } from "lucide-react";

// Local imports
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SequenceViewerProps {
  sequence: string;
  originalSequence?: string;
  title?: string;
  sequenceStyle?: React.CSSProperties;
  basesPerLine?: number;
  showPositionMarkers?: boolean;
  showComparison?: boolean;
}

const SequenceViewer: React.FC<SequenceViewerProps> = ({
  sequence,
  originalSequence,
  title = "Sequence",
  sequenceStyle = {},
  basesPerLine = 50,
  showPositionMarkers = true,
  showComparison = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const formattedSequence = useMemo(() => {
    // Split sequence into chunks of size basesPerLine
    const chunks: string[] = [];
    for (let i = 0; i < sequence.length; i += basesPerLine) {
      chunks.push(sequence.substring(i, i + basesPerLine));
    }
    return chunks;
  }, [sequence, basesPerLine]);

  // Function to determine if a base is mutated
  const isMutated = (index: number): boolean => {
    if (!originalSequence) return false;
    return (
      index < originalSequence.length &&
      sequence[index] !== originalSequence[index]
    );
  };

  // Enhanced nucleotide color mapping
  const getBaseColor = (base: string): string => {
    switch (base.toUpperCase()) {
      case "A":
        return "var(--adenine, #64C1FF)"; // Adenine - blue
      case "T":
        return "var(--thymine, #FF6B6B)"; // Thymine - red
      case "G":
        return "var(--guanine, #90EE90)"; // Guanine - green
      case "C":
        return "var(--cytosine, #FFD700)"; // Cytosine - gold
      case "U":
        return "var(--uracil, #FF6B6B)"; // Uracil - red (same as T for RNA)
      default:
        return "var(--foreground)"; // Default - system foreground
    }
  };

  // Get mutation description
  const getMutationInfo = (index: number): string => {
    if (!originalSequence || index >= originalSequence.length) return "";

    if (sequence[index] !== originalSequence[index]) {
      return `Position ${index + 1}: ${originalSequence[index]} → ${
        sequence[index]
      }`;
    }
    return `Position ${index + 1}: ${sequence[index]}`;
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    if (!sequence) return { a: 0, t: 0, g: 0, c: 0, other: 0 };

    return Array.from(sequence.toUpperCase()).reduce(
      (stats, base) => {
        if (base === "A") stats.a++;
        else if (base === "T" || base === "U") stats.t++;
        else if (base === "G") stats.g++;
        else if (base === "C") stats.c++;
        else stats.other++;
        return stats;
      },
      { a: 0, t: 0, g: 0, c: 0, other: 0 }
    );
  }, [sequence]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="w-full overflow-hidden border rounded-lg border-border/40">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/20">
        <h4 className="flex items-center text-sm font-medium">
          {title}
          {originalSequence && (
            <span className="ml-2 text-xs text-muted-foreground">
              {
                Array.from(sequence).filter(
                  (base, i) =>
                    i < originalSequence.length && base !== originalSequence[i]
                ).length
              }{" "}
              mutations
            </span>
          )}
        </h4>
        <div className="flex items-center gap-2">
          {sequence && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => copyToClipboard(sequence, "sequence")}
            >
              {copySuccess === "sequence" ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </Button>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Hover over bases to see details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        className="p-4 overflow-x-auto font-mono text-sm"
        style={{
          maxHeight: showComparison ? "500px" : "350px",
          overflowY: "auto",
          ...sequenceStyle,
        }}
      >
        {showComparison && originalSequence
          ? // Comparison view showing both sequences
            formattedSequence.map((_, lineIndex) => (
              <div key={lineIndex} className="mb-6 space-y-4">
                {/* Original sequence */}
                <div className="flex items-center mb-0">
                  <div className="pr-2 font-mono text-xs text-right select-none w-14 text-muted-foreground opacity-70">
                    Original
                  </div>
                  <div className="flex flex-wrap">
                    {Array.from(
                      originalSequence.substring(
                        lineIndex * basesPerLine,
                        Math.min(
                          (lineIndex + 1) * basesPerLine,
                          originalSequence.length
                        )
                      )
                    ).map((base, baseIndex) => {
                      const globalIndex = lineIndex * basesPerLine + baseIndex;
                      const willMutate =
                        globalIndex < sequence.length &&
                        sequence[globalIndex] !== base;

                      return (
                        <TooltipProvider key={baseIndex}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className={`
                                inline-flex items-center justify-center
                                px-0.5 rounded h-6 min-w-[1.5rem] m-px
                                transition-all duration-150 ease-in-out
                                ${willMutate ? "text-rose-500 font-medium" : ""}
                                ${(globalIndex + 1) % 10 === 0 ? "mr-1" : ""}
                                ${
                                  (globalIndex + 1) % 3 === 0
                                    ? "opacity-90"
                                    : "opacity-100"
                                }
                                hover:opacity-100 hover:bg-muted/30
                              `}
                                style={{
                                  color: willMutate
                                    ? "var(--rose-500)"
                                    : getBaseColor(base),
                                }}
                              >
                                {base}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">
                              <div className="font-mono">
                                Position {globalIndex + 1}: {base}
                                {willMutate && (
                                  <span className="block mt-1 text-rose-400 text-[10px]">
                                    Will be mutated
                                  </span>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                </div>

                {/* Mutated sequence */}
                <div className="flex items-center">
                  <div className="pr-2 font-mono text-xs text-right select-none w-14 text-muted-foreground opacity-70">
                    Mutated
                  </div>
                  <div className="flex flex-wrap">
                    {/* Show the corresponding part of the mutated sequence */}
                    {Array.from(
                      sequence.substring(
                        lineIndex * basesPerLine,
                        Math.min(
                          (lineIndex + 1) * basesPerLine,
                          sequence.length
                        )
                      )
                    ).map((base, baseIndex) => {
                      const globalIndex = lineIndex * basesPerLine + baseIndex;
                      const mutated = isMutated(globalIndex);

                      return (
                        <div key={baseIndex} className="relative">
                          {mutated && (
                            <span className="absolute left-0 flex items-center justify-center w-full h-full -top-6">
                              <ArrowDown className="w-3 h-3 text-primary/70" />
                            </span>
                          )}

                          <TooltipProvider key={baseIndex}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.span
                                  initial={
                                    mutated ? { scale: 0.8, opacity: 0.5 } : {}
                                  }
                                  animate={
                                    mutated ? { scale: 1, opacity: 1 } : {}
                                  }
                                  transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                  }}
                                  className={`
                                inline-flex items-center justify-center
                                px-0.5 rounded h-6 min-w-[1.5rem] m-px
                                transition-all duration-150 ease-in-out
                                ${
                                  mutated
                                    ? "text-emerald-500 font-medium ring-1 ring-primary/30"
                                    : ""
                                }
                                ${(globalIndex + 1) % 10 === 0 ? "mr-1" : ""}
                                ${
                                  (globalIndex + 1) % 3 === 0
                                    ? "opacity-90"
                                    : "opacity-100"
                                }
                                hover:opacity-100 hover:bg-muted/30
                              `}
                                  style={{
                                    color: mutated
                                      ? "var(--emerald-500)"
                                      : getBaseColor(base),
                                    backgroundColor: mutated
                                      ? "rgba(var(--primary), 0.15)"
                                      : "transparent",
                                  }}
                                >
                                  {base}
                                </motion.span>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="text-xs">
                                <div className="font-mono">
                                  {getMutationInfo(globalIndex)}
                                  {mutated && (
                                    <span className="block mt-1 text-emerald-400 text-[10px]">
                                      Mutated base
                                    </span>
                                  )}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          : // Standard single sequence view
            formattedSequence.map((line, lineIndex) => (
              <div key={lineIndex} className="flex mb-2">
                {showPositionMarkers && (
                  <div className="pr-2 font-mono text-xs text-right select-none w-14 text-muted-foreground opacity-70">
                    {lineIndex * basesPerLine + 1}
                  </div>
                )}
                <div className="flex flex-wrap">
                  {Array.from(line).map((base, baseIndex) => {
                    const globalIndex = lineIndex * basesPerLine + baseIndex;
                    const mutated = isMutated(globalIndex);

                    return (
                      <TooltipProvider key={baseIndex}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.span
                              initial={
                                mutated ? { scale: 0.8, opacity: 0.5 } : {}
                              }
                              animate={mutated ? { scale: 1, opacity: 1 } : {}}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className={`
                              inline-flex items-center justify-center
                              px-0.5 rounded h-6 min-w-[1.5rem] m-px
                              transition-all duration-150 ease-in-out
                              ${
                                mutated
                                  ? "font-bold ring-1 ring-primary/30"
                                  : ""
                              }
                              ${(globalIndex + 1) % 10 === 0 ? "mr-1" : ""}
                              ${
                                (globalIndex + 1) % 3 === 0
                                  ? "opacity-90"
                                  : "opacity-100"
                              }
                              hover:opacity-100 hover:bg-muted/30
                            `}
                              onMouseEnter={() => setHoveredIndex(globalIndex)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              style={{
                                color: getBaseColor(base),
                                backgroundColor: mutated
                                  ? "rgba(var(--primary), 0.15)"
                                  : "transparent",
                                textShadow: mutated
                                  ? "0 0 3px rgba(var(--primary), 0.4)"
                                  : "none",
                              }}
                            >
                              {base}
                            </motion.span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            <div className="font-mono">
                              {getMutationInfo(globalIndex)}
                              {hoveredIndex === globalIndex &&
                                mutated &&
                                originalSequence && (
                                  <span className="block mt-1 text-muted-foreground text-[10px]">
                                    Mutation at position {globalIndex + 1}
                                  </span>
                                )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            ))}
      </div>
      <div className="flex flex-wrap items-center justify-between px-4 py-2 text-xs border-t bg-muted/10 text-muted-foreground border-border/30">
        <div className="flex items-center">
          <span className="mr-3">Length: {sequence.length} bp</span>
          <div className="flex gap-2">
            <span className="flex items-center">
              <span
                className="inline-block w-2 h-2 mr-1 rounded-full"
                style={{ backgroundColor: getBaseColor("A") }}
              ></span>
              A: {statistics.a}
            </span>
            <span className="flex items-center">
              <span
                className="inline-block w-2 h-2 mr-1 rounded-full"
                style={{ backgroundColor: getBaseColor("T") }}
              ></span>
              T/U: {statistics.t}
            </span>
            <span className="flex items-center">
              <span
                className="inline-block w-2 h-2 mr-1 rounded-full"
                style={{ backgroundColor: getBaseColor("G") }}
              ></span>
              G: {statistics.g}
            </span>
            <span className="flex items-center">
              <span
                className="inline-block w-2 h-2 mr-1 rounded-full"
                style={{ backgroundColor: getBaseColor("C") }}
              ></span>
              C: {statistics.c}
            </span>
          </div>
        </div>
        {originalSequence && (
          <span>
            GC content:
            {Math.round(
              ((statistics.g + statistics.c) / sequence.length) * 100
            )}
            %
          </span>
        )}
      </div>
    </div>
  );
};

export default SequenceViewer;
