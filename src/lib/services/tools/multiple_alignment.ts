import api from "@/lib/api";

export interface MultipleAlignmentRequest {
  sequences: string;
  seq_type: "dna" | "protein";
}

export interface MultipleAlignmentResponse {
  alignment: string;
}

export const alignSequences = async (
  request: MultipleAlignmentRequest
): Promise<MultipleAlignmentResponse> => {
  const response = await api.client.post<MultipleAlignmentResponse>(
    api.endpoints.tools.multiple_alignment,
    request
  );

  if (!response) {
    throw new Error("Failed to align sequences");
  }

  return response as MultipleAlignmentResponse;
};
