import api from "@/lib/api";

export interface CompressionRequest {
  sequence: string;
  method: "run_length" | "delta";
  reference?: string;
}

export interface CompressionResponse {
  original: string;
  compressed: string;
  method: string;
  compression_ratio: number;
}

export const compressData = async (
  request: CompressionRequest
): Promise<CompressionResponse> => {
  const response = await api.client.post<CompressionResponse>(
    api.endpoints.tools.data_compression,
    request
  );

  if (!response) {
    throw new Error("Failed to compress data");
  }

  return response as CompressionResponse;
};
