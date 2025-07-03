import { Navigate, Outlet, useLocation } from "react-router-dom";

// local imports
import { Page } from "../core/page";
import { RightSidebar, Sidebar } from "../dashboard/sidebar";
import { useAuth } from "../../context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { DashboardNavbar } from "../dashboard/navbar";

const pathsToHideSidebars: string[] = ["/tools"];

const ProtectedLayoutContent = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const showSidebars = !pathsToHideSidebars.some((path) =>
    pathname.includes(path),
  );

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Page className="h-screen bg-background flex flex-col text-foreground p-4 gap-4">
      <DashboardNavbar
        containerClassName={!showSidebars ? "border-b border-border pb-4" : ""}
      />
      <Page className="flex gap-4 flex-1 min-h-0">
        {showSidebars && <Sidebar />}
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
        {showSidebars && <RightSidebar />}
      </Page>
      {/* <Outlet /> */}
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
