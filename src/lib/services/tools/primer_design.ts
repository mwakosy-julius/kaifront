import api from "@/lib/api";

export interface PrimerRequest {
  sequence: string;
}

export interface Primer {
  sequence: string;
  tm: number;
  gc: number;
  length: number;
}

export interface PrimerResult {
  primers: Primer[];
}

export const primerDesign = async (
  request: PrimerRequest,
): Promise<PrimerResult> => {
  try {
    const response = await api.client.post<PrimerResult>(
      api.endpoints.tools.primer_design,
      request,
    );

    if (!response.data) {
      throw new Error("No data returned from primer design API");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to design primers");
  }
};
