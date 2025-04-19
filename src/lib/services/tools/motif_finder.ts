import api from "@/lib/api";

export interface MotifRequest {
  fasta: string;
}

export interface MotifPosition {
  sequence: string;
  position: number;
  motif: string;
}

export interface MotifResponse {
  consensus: string;
  score: number;
  motif_length: number;
  positions: MotifPosition[];
}

export const findMotifs = async (fasta: string): Promise<MotifResponse> => {
  const response = await api.client.post<MotifResponse>(
    api.endpoints.tools.motif_finder,
    {},
    {
      params: { fasta },
    }
  );
  if (!response) {
    throw new Error("Failed to find motifs");
  }
  return response as MotifResponse;
};
