import { useUser } from "@/context/AuthContext";
import AvatarBubble from "./avatar";
import BBreadcrumb from "./bread-crumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/services/auth";
import { cn } from "@/lib/utils";

export const DashboardNavbar = () => {
  const user = useUser();

  return (
    <div
      className={cn(
        "h-[65px] px-8",
        "border-b border-gray-800",
        "bg-gray-900",
        "flex items-center justify-between"
      )}
    >
      <BBreadcrumb />

      <DropdownMenu>
        {" "}
        <DropdownMenuTrigger
          className={cn(
            "flex items-center gap-2 !outline-none",
            "border border-gray-700",
            "hover:border-cyan-700/50 transition-colors duration-200",
            "rounded-full md:!pl-3 pr-0.5 py-0.5"
          )}
        >
          <div className="flex items-center gap-4 !cursor-pointer">
            {" "}
            <p
              className={cn(
                "text-sm text-pretty hidden md:block",
                "text-gray-300"
              )}
            >
              {user?.email}
            </p>
            <AvatarBubble />
          </div>
        </DropdownMenuTrigger>{" "}
        <DropdownMenuContent
          className={cn(
            "md:w-64 w-40 mr-1 md:mr-0",
            "border border-gray-800",
            "bg-gray-900"
          )}
        >
          <DropdownMenuItem
            className={cn(
              "!cursor-pointer text-sm",
              "hover:bg-primary/5",
              "focus:bg-primary/5",
              "transition-colors duration-200"
            )}
            onClick={async () => {
              await logout().then(() => {
                window.location.href = "/";
              });
            }}
          >
            <LogOut size={12} className="text-muted-foreground" />
            <p className="ml-2 text-sm text-foreground">Sign out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
