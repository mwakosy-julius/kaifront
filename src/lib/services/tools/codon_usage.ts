import api from "@/lib/api";

export interface CodonData {
  amino_acid: string;
  relative_usage: number;
  percentage: number;
  count: number;
}

export interface CodonUsage {
  [codon: string]: CodonData;
}

export interface CodonUsageRequest {
  sequence: string;
}

export interface CodonUsageResponse {
  codon_usage: CodonUsage;
  table: string;
}

export const analyzeCodonUsage = async (
  sequence: string
): Promise<CodonUsageResponse> => {
  const response = await api.client.post<CodonUsageResponse>(
    api.endpoints.tools.codon_usage,
    { sequence }
  );

  if (!response) {
    throw new Error("Failed to get codon usage data");
  }

  return response as CodonUsageResponse;
};
