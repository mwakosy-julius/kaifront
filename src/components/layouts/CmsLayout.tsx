import { Navigate, Outlet } from "react-router-dom";

// local imports
import { Page } from "../core/page";
import { Sidebar } from "../cms/sidebar";
import { useAuth } from "../../context/AuthContext";
import { DashboardNavbar } from "../cms/navbar";
import { SidebarProvider } from "@/context/SidebarContext";

function ProtectedLayoutContent() {
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
    )
}

export default function CmsLayout() {
    return (
        <SidebarProvider>
            <ProtectedLayoutContent />
        </SidebarProvider>
    );
};