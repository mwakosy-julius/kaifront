import { useUser } from "@/context/AuthContext";
import AvatarBubble from "./avatar";
import BBreadcrumb from "./bread-crumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
import { logout } from "@/lib/services/auth";



export const DashboardNavbar = () => {

  const user = useUser();

  return (
    <div className="h-[65px] border-b border-neutral-100 px-8 flex items-center justify-between">
      <BBreadcrumb />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 !outline-none border md:!pl-3 pr-0.5 py-0.5 border-primary-100 rounded-full">
          <div className="flex items-center gap-4 !cursor-pointer">
            <p className="text-sm text-pretty hidden md:block text-neutral-500">{user?.email}</p>
            <AvatarBubble />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:w-64 w-40 mr-1 md:mr-0 shadow-none border-primary-100">
          <DropdownMenuItem
            className="!cursor-pointer text-sm"
            onClick={async () => {
              await logout().then(() => {
                window.location.href = "/";
              });
            }}
          >
            <LogOut size={12} className="text-neutral-500" />
            <p className="text-sm">Sing out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
