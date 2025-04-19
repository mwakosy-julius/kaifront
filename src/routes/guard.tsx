import { Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/LoadingFallback";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        state={{
          from: { pathname: location.pathname, search: location.search },
        }}
        replace
      />
    );
  }

  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export const PublicGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/dashboard";

    if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
      return <Navigate to={from} replace />;
    }
  }

  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};
