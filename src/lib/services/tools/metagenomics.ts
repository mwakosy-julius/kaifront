import api from "@/lib/api";

export interface MetagenomicsRequest {
  sequence: string;
}

export interface TaxonomyMatch {
  taxon_id: number;
  scientific_name: string;
  rank: string;
  score: number;
  percent_identity: number;
  e_value: number;
}

export interface MetagenomicsResponse {
  matches: TaxonomyMatch[];
  stats: {
    total_reads: number;
    classified_reads: number;
    unclassified_reads: number;
  };
  visualization_data: {
    [key: string]: number;
  };
}

export const analyzeMetagenomics = async (
  sequence: string
): Promise<MetagenomicsResponse> => {
  const response = await api.client.post<MetagenomicsResponse>(
    api.endpoints.tools.metagenomics,
    { sequence }
  );
  if (!response) {
    throw new Error("Failed to analyze metagenomics data");
  }
  return response as MetagenomicsResponse;
};
