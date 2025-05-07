import api from "@/lib/api";

export interface PhylogeneticTreeRequest {
  fasta: string;
}

export interface PhylogeneticTreeResponse {
  newick: string;
  svg: string;
}

export const generatePhylogeneticTree = async (
  sequences: string
): Promise<PhylogeneticTreeResponse> => {
  const response = await api.client.post<PhylogeneticTreeResponse>(
    api.endpoints.tools.phylogenetic_tree,
    {},
    {
      params: { fasta: sequences },
    }
  );
  if (!response) {
    throw new Error("Failed to generate phylogenetic tree");
  }
  return response as PhylogeneticTreeResponse;
};
