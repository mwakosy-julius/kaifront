import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { AuthGuard } from "../guard";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";

export const ProtectedRoot = () => (
  <AuthGuard>
    <ProtectedLayout />
  </AuthGuard>
);

// export const LazyDashboard = lazy(() => import("@/pages/protected/dashboard"));
export const LazyDashboard = lazy(
  () => import("@/pages/protected/dashboard/v2")
);
export const ProtectedNotFound = () => <Navigate to="/" replace />;
export const LazyData = lazy(() => import("@/pages/protected/data-page"));
export const LazyProfile = lazy(() => import("@/pages/protected/profile/new"));
export const LazyProfileEdit = lazy(() => import("@/pages/protected/profile"));
export const LazyTools = lazy(() => import("@/pages/protected/dashboard"));
export const LazyResults = lazy(() => import("@/pages/protected/results-page"));
export const LazyCopilot = lazy(() => import("@/pages/protected/copilot-page"));
export const LazyUpgrade = lazy(() => import("@/pages/protected/upgrade-page"));
export const LazyWorkflow = lazy(
  () => import("@/pages/protected/workflow-page")
);

// Tools Routes
export const LazyPairwiseAlignment = lazy(
  () => import("@/pages/protected/tools/pairwise-alignment"),
);
export const LazyGCContent = lazy(
  () => import("@/pages/protected/tools/gc-content"),
);
export const LazyVariantCalling = lazy(
  () => import("@/pages/protected/tools/variant-calling"),
);
export const LazyDNAVisualization = lazy(
  () => import("@/pages/protected/tools/dna-visualization"),
);
export const LazyDataCompression = lazy(
  () => import("@/pages/protected/tools/data-compression"),
);
export const LazyConsensusMaker = lazy(
  () => import("@/pages/protected/tools/consensus-maker"),
);
export const LazyCodonUsage = lazy(
  () => import("@/pages/protected/tools/codon-usage"),
);
export const LazyMotifFinder = lazy(
  () => import("@/pages/protected/tools/motif-finder"),
);
export const LazyMultipleAlignment = lazy(
  () => import("@/pages/protected/tools/multiple-alignment"),
);
export const LazyMusicDNA = lazy(
  () => import("@/pages/protected/tools/musicdna"),
);
export const LazyMetagenomics = lazy(
  () => import("@/pages/protected/tools/metagenomics"),
);
export const LazyBlast = lazy(() => import("@/pages/protected/tools/blast"));
export const LazyPhylogeneticTree = lazy(
  () => import("@/pages/protected/tools/phylogenetic-tree"),
);
export const LazySequenceSearch = lazy(
  () => import("@/pages/protected/tools/sequence-search"),
);
export const LazyProteinStructure = lazy(
  () => import("@/pages/protected/tools/protein-structure"),
);
export const LazySequenceMutator = lazy(
  () => import("@/pages/protected/tools/sequence-mutator"),
);
export const LazyPrimerDesigner = lazy(
  () => import("@/pages/protected/tools/primer-design"),
);
export const LazyPrimerDesigner = lazy(
  () => import("@/pages/protected/tools/primer-design")
);
