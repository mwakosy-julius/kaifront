import { Navigate, Outlet } from "react-router-dom";

// local imports
import { Page } from "../core/page";
import { RightSidebar, Sidebar } from "../dashboard/sidebar";
import { useAuth } from "../../context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DashboardNavbar } from "../dashboard/navbar";

const ProtectedLayoutContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Page className="h-screen bg-background flex flex-col text-foreground p-4 gap-4">
      <DashboardNavbar />
      <Page className="flex gap-4">
        <Sidebar />
        <Outlet />
        <RightSidebar />
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
