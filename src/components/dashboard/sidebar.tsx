import { Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import DashboardLogo from "@/assets/images/dashboard-logo.svg";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();

  const navItems = [{ icon: Settings, label: "Settings", path: "/settings" }];

  return (
    <aside
      className={cn(
        "h-full ",
        "border-border",
        "transition-all duration-300 ease-in-out",
        isExpanded ? "-translate-x-16 w-0" : ""
      )}
    >
      <div className="relative flex items-center">
        <Link
          to="/dashboard"
          className={cn(
            "h-[65px] w-[60px]",
            "relative flex items-center bg-background justify-center",
            "transition-opacity duration-300",
            isExpanded ? "opacity-0" : "opacity-100"
          )}
        >
          <img
            src={DashboardLogo}
            alt="Logo"
            className={cn(
              "absolute w-12 h-12 object-contain",
              "transition-opacity duration-200",
              isExpanded ? "opacity-0" : "opacity-100"
            )}
          />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            // "ml-auto md:hidden absolute",
            // "hover:bg-primary/5",
            "transition-all duration-200",
            isExpanded ? "-right-[100px]" : "-right-[36px]"
          )}
        >
          {!isExpanded ? (
            <ChevronLeft className="w-6 h-6 text-primary" />
          ) : (
            <ChevronRight className="w-6 h-6 text-primary" />
          )}
        </Button>
      </div>

      <nav className="flex flex-col items-center w-full py-1 overflow-hidden">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "h-[70px] w-[60px] justify-center",
              "hover:bg-primary/5",
              "transition-all duration-200",
              "flex items-center",
              isExpanded ? "gap-3" : ""
            )}
          >
            <item.icon
              className={cn(
                "w-8 h-8",
                "text-muted-foreground",
                "transition-colors duration-200",
                "group-hover:text-primary"
              )}
            />
            <span className="sr-only">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
