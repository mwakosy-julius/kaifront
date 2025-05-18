import api from "@/lib/api";

export interface SequenceRequest {
  query: string;
  query_type: "gene" | "protein";
}

export interface SequenceResult {
  id: string;
  name: string;
  description: string;
}

export interface SearchResponse {
  gene_results: SequenceResult;
  protein_results: SequenceResult;
}

export const searchSequence = async (request: SequenceRequest): Promise<SearchResponse> => {
  const response = await api.client.post<SearchResponse>(
    api.endpoints.tools.sequence_search,
    request
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch sequence search results");
  }
  

  return response as SearchResponse;
};