import api from "@/lib/api";

export interface BlastResult {
  organism_name: string;
  hit_id: string;
  percentage_match: number;
}

export interface BlastRequest {
  sequence: string;
}

// export interface BlastResponse {
//   results: BlastResult[];
// }

export interface BlastResult {
  organism: string; // Added the missing property
  accession: string;
  hit_id: string;
  percentage_identity: number;
  query_coverage: number;
  evalue: number;
  bit_score: number;
  gaps: number;
}

export const runBlast = async (sequence: string): Promise<BlastResult> => {
  const response = await api.client.post<BlastResult>(
    api.endpoints.tools.blast,
    { sequence }
  );

  if (!response) {
    throw new Error("Failed to get BLAST results");
  }

  return response as BlastResult;
};
