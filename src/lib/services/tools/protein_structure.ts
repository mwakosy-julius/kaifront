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
    
    return response as StructurePrediction;
  }
  catch (error) {
    console.error("Error predicting protein structure:", error);
    return {
      sequence,
      pdb_data: "",
      confidence: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};