import api from "@/lib/api";

export interface StructurePrediction {
  sequence: string;
  molecular_weight: string;
  isometric_point: string;
  hydrophobic_state: string;
  pdb_data: string;
  confidence: number;
  error?: string;
}

export const predictStructure = async (
  sequence: string,
): Promise<StructurePrediction> => {
  try {
    const response = await api.client.post<StructurePrediction>(
      api.endpoints.tools.protein_structure,
      { sequence },
    );

    return response as StructurePrediction;
  } catch (error) {
    console.error("Error predicting protein structure:", error);
    return {
      sequence: sequence,
      molecular_weight: "",
      isometric_point: "",
      hydrophobic_state: "",
      pdb_data: "",
      confidence: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
