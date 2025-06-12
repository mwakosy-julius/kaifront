import { useUser } from "@/context/AuthContext";
import AvatarBubble from "./avatar";
import BBreadcrumb from "./bread-crumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { logout } from "@/lib/services/auth";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../shared/theme-toggler-button";
import { Link } from "react-router-dom";

export const DashboardNavbar = () => {
  const user = useUser();

  return (
    <div
      className={cn(
        "h-[65px] px-8",
        "border-b border-border",
        "bg-background",
        "flex items-center justify-between"
      )}
    >
      <BBreadcrumb />

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-2 !outline-none",
              "border border-primary/20",
              "hover:border-primary/30 transition-colors duration-200",
              "rounded-full md:!pl-3 pr-0.5 py-0.5"
            )}
          >
            <div className="flex items-center gap-4 !cursor-pointer">
              <p
                className={cn(
                  "text-sm text-pretty hidden md:block",
                  "text-muted-foreground"
                )}
              >
                {user?.name || user?.email}
              </p>
              <AvatarBubble />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              "md:w-64 w-40 mr-1 md:mr-0",
              "border border-border",
              "bg-background"
            )}
          >
            <DropdownMenuItem
              className={cn(
                "!cursor-pointer text-sm",
                "hover:bg-primary/5",
                "focus:bg-primary/5",
                "transition-colors duration-200"
              )}
              asChild
            >
              <Link to="profile">
                <User size={12} className="text-muted-foreground" />
                <p className="text-sm text-foreground">Profile</p>
              </Link>
            </DropdownMenuItem>
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

        <ModeToggle />
      </div>
    </div>
  );
};
