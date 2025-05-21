import api from "@/lib/api";

export interface SequenceRequest {
  query: string;
  query_type: "gene" | "protein";
}

export interface SequenceResult {
  // id: string;
  // name: string;
  // description: string;
  error?: string;
  sequences?: string;
}

export interface SearchResponse {
  sequence_results: SequenceResult;
}

export const searchSequence = async (request: SequenceRequest): Promise<SearchResponse> => {
  const response = await api.client.post<SearchResponse>(
    api.endpoints.tools.sequence_search,
    request
  );
  console.log("Response from sequence search:", response);
  

  return response as SearchResponse;
};