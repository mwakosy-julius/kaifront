import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { AuthGuard } from "../guard";
import CmsLayout from "@/components/layouts/CmsLayout";

export const ProtectedRoot = () => (
  <AuthGuard>
    <CmsLayout />
  </AuthGuard>
);

export const LazyDashboard = lazy(() => import("@/pages/cms/index"));
export const ProtectedNotFound = () => <Navigate to="/" replace />;
export const LazyBlogs = lazy(
  () => import("@/pages/cms/blog/index")
);
export const LazyCreateBlogs = lazy(
  () => import("@/pages/cms/blog/create")
);