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
