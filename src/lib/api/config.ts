export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/token",
    register: "/auth/signup",
    refreshToken: "/auth/refresh",
    logout: "/auth/logout",
  },
  tools: {
    list: "/auth/users/tools",
    blast: "tools/blast",
    pairwise_alignment: "tools/pairwise_alignment",
    gc_content: "tools/gc_content",
    variant_calling: "tools/variant_calling",
    dna_visualization: "tools/dna_visualization",
    data_compression: "tools/data_compression",
    consensus_maker: "tools/consensus_maker",
    codon_usage: "tools/codon_usage",
    motif_finder: "tools/motif_finder",
    multiple_alignment: "tools/multiple_alignment",
    sequence_search: "tools/sequence_search",
    musicdna: "tools/musicdna",
    metagenomics: "tools/metagenomics",
    phylogenetic_tree: "tools/phylogenetic_trees",
    protein_structure: "tools/protein_structure",
    sequence_mutator: "tools/sequence_mutator",
    primer_design: "tools/primer_design",
    quality_control: "tools/quality_control",
    assembly: "tools/assembly",
  },
  users: {
    profile: "/auth/users/me",
    update: "/users/update",
  },
} as const;
