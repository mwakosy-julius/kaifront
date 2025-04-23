import {
  ProtectedRoot,
  LazyDashboard,
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
    ],
  },
];
