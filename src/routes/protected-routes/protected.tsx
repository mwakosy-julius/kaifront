import {
  ProtectedRoot,
  LazyDashboard,
  LazyProfile,
  LazyPairwiseAlignment,
  LazyGCContent,
  LazyVariantCalling,
  LazyDNAVisualization,
  LazyDataCompression,
  LazyConsensusMaker,
  LazyCodonUsage,
  LazyMotifFinder,
  LazyMultipleAlignment,
  LazyMusicDNA,
  LazyBlast,
  LazyMetagenomics,
  LazyPhylogeneticTree,
  LazySequenceSearch,
  LazyProteinStructure,
  LazySequenceMutator,
  LazyPrimerDesigner,
} from "./protected-route-elements";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoot />,
    children: [
      {
        index: true,
        element: <LazyDashboard />,
      },
      {
        path: "profile",
        element: <LazyProfile />,
      },
      {
        path: "tools/pairwise_alignment",
        element: <LazyPairwiseAlignment />,
      },
      {
        path: "tools/gc_content",
        element: <LazyGCContent />,
      },
      {
        path: "tools/variant_calling",
        element: <LazyVariantCalling />,
      },
      {
        path: "tools/dna_visualization",
        element: <LazyDNAVisualization />,
      },
      {
        path: "tools/data_compression",
        element: <LazyDataCompression />,
      },
      {
        path: "tools/consensus_maker",
        element: <LazyConsensusMaker />,
      },
      {
        path: "tools/codon_usage",
        element: <LazyCodonUsage />,
      },
      {
        path: "tools/motif_finder",
        element: <LazyMotifFinder />,
      },
      {
        path: "tools/multiple_alignment",
        element: <LazyMultipleAlignment />,
      },
      {
        path: "tools/music_dna",
        element: <LazyMusicDNA />,
      },
      {
        path: "tools/metagenomics",
        element: <LazyMetagenomics />,
      },
      {
        path: "tools/blast",
        element: <LazyBlast />,
      },
      {
        path: "tools/sequence_search",
        element: <LazySequenceSearch />,
      },
      {
        path: "tools/phylogenetic_tree",
        element: <LazyPhylogeneticTree />,
      },
      {
        path: "tools/protein_structure",
        element: <LazyProteinStructure />,
      },
      {
        path: "tools/sequence_mutator",
        element: <LazySequenceMutator />,
      },
      {
        path: "tools/primer_design",
        element: <LazyPrimerDesigner />,
      },
    ],
  },
];
