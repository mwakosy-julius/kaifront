import { Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import DashboardLogo from "@/assets/images/dashboard-logo.svg";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
    const { isExpanded, toggleSidebar } = useSidebar();

    const navItems = [
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <aside
            className={cn(
                "h-full border-r border-neutral-100 transition-all duration-300",
                isExpanded ? "-translate-x-16 w-0" : ""
            )}
        >
            <div className="flex items-center relative">

                <Link to="/dashboard" className={`h-[60px] w-[60px] relative flex items-center justify-center`}>
                    <img src={DashboardLogo} alt="Logo" className={`absolute w-12 h-12 object-contain  ${isExpanded ? "hidden" : ""}`} />
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className={`ml-auto mr-2 md:hidden absolute  bg-none hover:!bg-transparent ${isExpanded ? "-right-[100px]" : "-right-[36px]"}`}
                >
                    {!isExpanded ? (
                        <ChevronLeft className="h-6 w-6" />
                    ) : (
                        <ChevronRight className="h-6 w-6" />
                    )}
                </Button>
            </div>

            <nav className="flex flex-col w-full items-center py-1 overflow-hidden">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "h-[70px] w-[60px] justify-center hover:bg-gray-100 rounded-none transition-colors flex items-center",
                            isExpanded ? "gap-3" : ""
                        )}
                    >
                        <item.icon className="w-8 h-8 text-neutral-400 " />
                        <span className="sr-only">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};