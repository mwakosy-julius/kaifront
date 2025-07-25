import api, { apiLogger } from "@/lib/api";
import { KaiToolsInterface } from "./types";

export const tools = async () => {
  try {
    const response = await api.client.get<{ tools: KaiToolsInterface[] }>(
      api.endpoints.tools.list,
    );
    // @ts-ignore
    return response?.tools || [];
  } catch (error) {
    apiLogger.error(
      "GET",
      api.endpoints.tools.list,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      },
    );
    throw error;
  }
};

// Export all tool services
export * from "./variant_calling";
export * from "./blast";
export * from "./sequence_search";
export * from "./pairwise_alignment";
export * from "./gc_content";
export * from "./dna_visualization";
export * from "./data_compression";
export * from "./consensus_maker";
export * from "./codon_usage";
export * from "./motif_finder";
export * from "./multiple_alignment";
export * from "./protein_structure";
export * from "./sequence_mutator";
// export * from "./musicdna";
export * from "./metagenomics";
export * from "./primer_design";
export * from "./phylogenetic_tree";
export * from "./types";
