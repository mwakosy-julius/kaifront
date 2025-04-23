import api from "@/lib/api";

export interface BlastResult {
  organism_name: string;
  hit_id: string;
  percentage_match: number;
}

export interface BlastRequest {
  sequence: string;
}

export interface BlastResponse {
  results: BlastResult[];
}

export const runBlast = async (sequence: string): Promise<BlastResponse> => {
  const response = await api.client.post<BlastResponse>(
    api.endpoints.tools.blast,
    { sequence }
  );

  if (!response) {
    throw new Error("Failed to get BLAST results");
  }

  return response as BlastResponse;
};
