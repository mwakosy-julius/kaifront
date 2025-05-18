import api from "@/lib/api";

export interface StructurePrediction {
  sequence: string;
  pdb_data: string;
  confidence: number;
  error?: string;
}

export const predictStructure = async (sequence: string): Promise<StructurePrediction> => {
  try {
    const response = await api.client.post<StructurePrediction>
    (api.endpoints.tools.protein_structure, 
    { sequence });
    if (!response.data) {
      throw new Error("No data returned from structure prediction API");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to predict structure");
  }
};