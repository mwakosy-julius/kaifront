import api from "@/lib/api";

export interface DNAVisualizationRequest {
  sequence: string;
}

export interface NucleotideCount {
  count: number;
  percentage: number;
}

export type AminoAcids =
  | "Phe"
  | "Leu"
  | "Ile"
  | "Met"
  | "Val"
  | "Ser"
  | "Pro"
  | "Thr"
  | "Ala"
  | "Tyr"
  | "His"
  | "Gln"
  | "Asn"
  | "Lys"
  | "Asp"
  | "Glu"
  | "Cys"
  | "Trp"
  | "Arg"
  | "Gly";

export interface DNAVisualizationResponse {
  transcript: string;
  amino_acids: string;
  gc_content: string;
  dna_counts: {
    A: number;
    T: number;
    G: number;
    C: number;
  };
  dna_percentages: {
    A: number;
    T: number;
    G: number;
    C: number;
  };
  amino_acid_counts: {
    [key in AminoAcids]: number;
  };
  amino_acid_percentages: {
    [key in AminoAcids]: number;
  };
}

// Helper types for charts using Recharts
export interface NucleotideDataPoint {
  name: "A" | "T" | "G" | "C";
  count: number;
  percentage: number;
}

export interface AminoAcidDataPoint {
  name: string; // Amino acid name (Phe, Leu, etc.)
  count: number;
  percentage: number;
}

export const visualizeDNA = async (
  sequence: string
): Promise<DNAVisualizationResponse> => {
  const response = await api.client.post<DNAVisualizationResponse>(
    api.endpoints.tools.dna_visualization,
    { sequence }
  );
  if (!response) {
    throw new Error("Failed to get DNA visualization data");
  }
  return response as DNAVisualizationResponse;
};
