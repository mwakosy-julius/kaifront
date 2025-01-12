import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Page } from "../core/page";
import { Sidebar } from "../dashboard/sidebar";
import { DashboardNavbar } from "../dashboard/navbar";
import { SidebarProvider } from "@/context/SidebarContext";
import { Footer } from "../shared/footer";
import { cn } from "@/lib/utils";

const ProtectedLayoutContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Page
      overflowHidden
      className={cn(
        "flex !flex-row",
        "bg-background text-foreground"
      )}
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
        <div className="flex-1 overflow-auto relative">
          <main className={cn(
            "min-h-full px-6 py-6",
            "bg-background/50"
          )}>
            <Outlet />
          </main>
          <Footer />
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