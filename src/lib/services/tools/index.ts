import api, { apiLogger } from "@/lib/api";
import { KaiToolsInterface } from "./types";

export const tools = async () => {
  try {
    const response = await api.client.get<KaiToolsInterface[]>(
      api.endpoints.tools.list
    );
    return response;
  } catch (error) {
    apiLogger.error(
      "GET",
      api.endpoints.tools.list,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
    throw error;
  }
};

// Export all tool services
export * from "./variant_calling";
export * from "./pairwise_alignment";
export * from "./gc_content";
export * from "./dna_visualization";
export * from "./data_compression";
export * from "./consensus_maker";
export * from "./codon_usage";
export * from "./motif_finder";
export * from "./multiple_alignment";
export * from "./musicdna";
export * from "./metagenomics";
export * from "./phylogenetic_tree";
export * from "./types";
