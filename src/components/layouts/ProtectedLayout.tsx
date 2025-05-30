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
    <Page overflowHidden className="flex !flex-row bg-gray-900 text-white">
      <Sidebar />{" "}
      <Page
        overflowHidden
        className="flex flex-col flex-1 border-l border-gray-800"
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
