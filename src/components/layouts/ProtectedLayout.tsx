import { Navigate, Outlet } from "react-router-dom";

// local imports
import { Page } from "../core/page";
import { Sidebar } from "../dashboard/sidebar";
import { useAuth } from "../../context/AuthContext";
import { DashboardNavbar } from "../dashboard/navbar";
import { SidebarProvider } from "@/context/SidebarContext";

const ProtectedLayoutContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Page
      overflowHidden
      className="flex !flex-row bg-background text-foreground"
    >
      <Sidebar />
      <Page
        overflowHidden
        className="flex flex-col flex-1 border-l border-border"
      >
        <DashboardNavbar />
        <div className="relative flex-1 overflow-auto">
          <main className="min-h-full my-6">
            <Outlet />
          </main>
        </div>
      </Page>
    </Page>
  );
};

const ProtectedLayout = () => {
  return (
    <SidebarProvider>
      <ProtectedLayoutContent />
    </SidebarProvider>
  );
};

export default ProtectedLayout;
