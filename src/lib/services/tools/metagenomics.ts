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

export interface Taxon {
  genus: string;
  abundance: number;
}

export interface Stats {
  total_reads: number;
  classified_kmers: number;
  unique_genera: number;
}

export interface Detail {
  genus: string;
  phylum: string;
  kmer_count: number;
  distance?: number;
  confidence: number;
}

export interface MetagenomicsResponse {
  taxa: Taxon[];
  stats: Stats;
  details: Detail[];
}

export const analyzeMetagenomics = async (
  sequence: string
): Promise<MetagenomicsResponse> => {
  const response = await api.client.post<MetagenomicsResponse>(
    api.endpoints.tools.metagenomics,
    { fasta_text: sequence }
  );
  if (!response) {
    throw new Error("Failed to analyze metagenomics data");
  }
  return response as MetagenomicsResponse;
};
