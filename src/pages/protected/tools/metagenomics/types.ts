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

export interface AnalysisResult {
  taxa: Taxon[];
  stats: Stats;
  details: Detail[];
}

// For compatibility with the API response
export interface MetagenomicsResponse extends AnalysisResult {
  // Any additional fields from the API can be added here
}
