import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Page } from "../core/page";
import { Sidebar } from "../dashboard/sidebar";
import { DashboardNavbar } from "../dashboard/navbar";
import { SidebarProvider } from "@/context/SidebarContext";
import { Footer } from "../shared/footer";

const ProtectedLayoutContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Page
      overflowHidden
      className="flex !flex-row"
    >
      <Sidebar />
      <Page
        overflowHidden
        className="flex-1 flex flex-col"
      >
        <DashboardNavbar />
        <div className="flex-1 overflow-auto relative">
          <main className="min-h-full px-6 py-6">
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