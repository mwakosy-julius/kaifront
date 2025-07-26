import { Outlet } from "react-router-dom";

// local imports
// import { Page } from "../core/page";
// import { RightSidebar, Sidebar } from "../dashboard/sidebar";
// import { useAuth } from "../../context/AuthContext";
// import { DashboardNavbar } from "../dashboard/navbar";
import { AppSidebar } from "../core/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

// const pathsToHideSidebars: string[] = ["/tools"];

// const ProtectedLayoutContent = () => {
//   const { isAuthenticated } = useAuth();
//   const { pathname } = useLocation();

//   const showSidebars = !pathsToHideSidebars.some((path) =>
//     pathname.includes(path),
//   );

//   if (!isAuthenticated) {
//     return <Navigate to="/sign-in" />;
//   }

//   return (
//     <Page className="flex flex-col h-screen gap-4 p-4 bg-background text-foreground">
//       <DashboardNavbar
//         containerClassName={!showSidebars ? "border-b border-border pb-4" : ""}
//       />
//       <Page className="flex flex-1 min-h-0 gap-4">
//         {showSidebars && <Sidebar />}
//         <div className="flex-1 min-h-0 overflow-auto">
//           <Outlet />
//         </div>
//         {/* {showSidebars && <RightSidebar />} */}
//       </Page>
//       {/* <Outlet /> */}
//     </Page>
//   );
// };

const ProtectedLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center h-14">
              <SidebarTrigger className="mr-2" />
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
