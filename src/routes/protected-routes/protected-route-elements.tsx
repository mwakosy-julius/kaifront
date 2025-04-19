import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { AuthGuard } from "../guard";
import ProtectedLayout from "@/components/layouts/ProtectedLayout";

export const ProtectedRoot = () => (
  <AuthGuard>
    <ProtectedLayout />
  </AuthGuard>
);

export const LazyDashboard = lazy(() => import("@/pages/protected/dashboard"));
export const ProtectedNotFound = () => <Navigate to="/" replace />;
export const LazyPairwiseAlignment = lazy(
  () => import("@/pages/protected/tools/pairwise-alignment")
);
export const LazyGCContent = lazy(
  () => import("@/pages/protected/tools/gc-content")
);
export const LazyVariantCalling = lazy(
  () => import("@/pages/protected/tools/variant-calling")
);
export const LazyDNAVisualization = lazy(
  () => import("@/pages/protected/tools/dna-visualization")
);
export const LazyDataCompression = lazy(
  () => import("@/pages/protected/tools/data-compression")
);
export const LazyConsensusMaker = lazy(
  () => import("@/pages/protected/tools/consensus-maker")
);
export const LazyCodonUsage = lazy(
  () => import("@/pages/protected/tools/codon-usage")
);
export const LazyMotifFinder = lazy(
  () => import("@/pages/protected/tools/motif-finder")
);
export const LazyMultipleAlignment = lazy(
  () => import("@/pages/protected/tools/multiple-alignment")
);
export const LazyMusicDNA = lazy(
  () => import("@/pages/protected/tools/musicdna")
);
