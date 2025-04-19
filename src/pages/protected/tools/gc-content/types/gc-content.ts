export interface GCContentInput {
  sequence: string;
  window_size: number;
}

export interface NucleotideCount {
  count: number;
  percentage: number;
}

export interface NucleotideCounts {
  A: NucleotideCount;
  T: NucleotideCount;
  G: NucleotideCount;
  C: NucleotideCount;
}

export interface PlotDataPoint {
  position: number;
  gc_content: number;
}

export interface GCContentResponse {
  total_length: number;
  nucleotides: NucleotideCounts;
  gc_content: number[];
  positions: number[];
  plot_data: PlotDataPoint[];
  window_size: number;
}
