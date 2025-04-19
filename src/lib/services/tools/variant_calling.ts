import api from "@/lib/api";

// TypeScript interfaces matching FastAPI models
export interface VariantCallRequest {
  ref_fasta: string;
  sample_fasta: string;
}

export interface Variant {
  position: number;
  reference: string;
  variant: string;
  type: string;
}

export interface VariantCallResponse {
  variants: Variant[];
}

export const callVariants = async (
  request: VariantCallRequest
): Promise<VariantCallResponse> => {
  const response = await api.client.get<VariantCallResponse>(
    api.endpoints.tools.variant_calling,
    {
      params: {
        ref_fasta: request.ref_fasta,
        sample_fasta: request.sample_fasta,
      },
    }
  );

  if (!response) {
    throw new Error("Failed to get variant call data");
  }
  return response as VariantCallResponse;
};
