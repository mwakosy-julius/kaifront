import { Navigate, Outlet } from "react-router-dom";

// local imports
import { cn } from "@/lib/utils";
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
      className={cn("flex !flex-row", "bg-background text-foreground")}
    >
      <Sidebar />
      <Page
        overflowHidden
        className={cn(
          "flex-1 flex flex-col",
          "bg-background border-l border-border"
        )}
      >
        <DashboardNavbar />
        <div className="relative flex-1 overflow-auto">
          <main className={cn("min-h-full ", "bg-background")}>
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
