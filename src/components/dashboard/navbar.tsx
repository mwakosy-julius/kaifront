import { useUser } from "@/context/AuthContext";
import AvatarBubble from "./avatar";
import BBreadcrumb from "./bread-crumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, LogOut, SearchIcon, User } from "lucide-react";
import { logout } from "@/lib/services/auth";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../shared/theme-toggler-button";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

export const DashboardNavbar = ({
  containerClassName,
}: {
  containerClassName?: string;
}) => {
  const user = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={cn(
        // "px-8",
        // "border-b border-border",
        "bg-background",
        "flex items-center justify-between",
        containerClassName,
      )}
    >
      <BBreadcrumb />

      <div className="flex items-center space-x-4">
        <Button
          href="/dashboard"
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-neutral-100 border border-border rounded-full text-neutral-500"
        >
          <Home className="w-4 h-4" />
        </Button>
        <div className="relative w-80">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="What do you want to analyze?"
            className="pl-9 bg-background/60 transition-all duration-200 focus:bg-background focus:shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-2 !outline-none",
              "border border-primary/20",
              "hover:border-primary/30 transition-colors duration-200",
              "rounded-full md:!pl-3 pr-0.5 py-0.5",
            )}
          >
            <div className="flex items-center gap-4 !cursor-pointer">
              <p
                className={cn(
                  "text-sm text-pretty hidden md:block",
                  "text-muted-foreground",
                )}
              >
                {/* {user?.name || user?.email} */}
                {user?.username || user?.email}
              </p>
              <AvatarBubble />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn(
              "md:w-64 w-40 mr-1 md:mr-0",
              "border border-border",
              "bg-background",
            )}
          >
            <DropdownMenuItem
              className={cn(
                "!cursor-pointer text-sm",
                "hover:bg-primary/5",
                "focus:bg-primary/5",
                "transition-colors duration-200",
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
                "transition-colors duration-200",
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
