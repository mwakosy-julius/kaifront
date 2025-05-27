import api from "@/lib/api";

export interface BlastRequest {
  sequence: string;
  seqType: "dna" | "protein";
}

export interface BlastResult {
  results: {
    organism: string;
    hit_id: string;
    percentage_match: number;
  }[];
}

export const runBlast = async (request: BlastRequest): Promise<BlastResult> => {
  const response = await api.client.post<BlastResult>(
    api.endpoints.tools.blast,
    request
  );

  if (!response) {
    throw new Error("Failed to get BLAST results");
  }
  return response as BlastResult;
};
