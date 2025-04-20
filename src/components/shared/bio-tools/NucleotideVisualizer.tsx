import React from "react";

export interface NucleotideVisualizerProps {
  sequence: string;
  animated?: boolean;
  wrapText?: boolean;
  colorMap?: Record<string, string>;
  hoverEffect?: boolean;
  fontSize?: string;
}

const NucleotideVisualizer: React.FC<NucleotideVisualizerProps> = ({
  sequence,
  animated = true,
  wrapText = true,
  colorMap,
  hoverEffect = true,
  fontSize = "text-sm",
}) => {
  // Default nucleotide color mapping
  const defaultColorMap: Record<string, string> = {
    A: "text-green-500",
    T: "text-red-500",
    G: "text-blue-500",
    C: "text-yellow-500",
    U: "text-purple-500",
    N: "text-muted-foreground",
    "-": "text-muted-foreground",
  };

  const nucleotideColors = colorMap || defaultColorMap;

  const getNucleotideColor = (base: string): string => {
    const upperCaseBase = base.toUpperCase();
    return nucleotideColors[upperCaseBase] || "text-muted-foreground";
  };

  return (
    <div className="font-mono">
      <div
        className={`${
          wrapText ? "flex flex-wrap" : "overflow-x-auto whitespace-nowrap"
        }`}
      >
        {sequence.split("").map((base, idx) => {
          const animationDelay = animated
            ? `transition-all delay-[${Math.min(idx * 2, 1000)}ms]`
            : "";
          const hoverClass = hoverEffect ? "hover:scale-125" : "";

          return (
            <span
              key={idx}
              className={`${getNucleotideColor(
                base
              )} ${fontSize} ${animationDelay} ${hoverClass}`}
            >
              {base}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default NucleotideVisualizer;
