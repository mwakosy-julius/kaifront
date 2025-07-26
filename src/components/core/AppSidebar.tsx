import {
  BarChart3,
  Bot,
  Database,
  Home,
  Settings,
  Wrench,
  User,
  Users,
  Workflow,
  BookOpen,
  Bell,
  TrendingUp,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Tools", url: "tools", icon: Wrench },
  { title: "Workflows", url: "workflows", icon: Workflow },
  { title: "Data", url: "data", icon: Database },
  { title: "Results", url: "results", icon: BarChart3 },
];

const resourceItems = [
  { title: "Tutorials", url: "tutorials", icon: BookOpen },
  { title: "Consultancy", url: "consultancy", icon: Users },
  { title: "Notifications", url: "notifications", icon: Bell },
  { title: "Upgrade", url: "upgrade", icon: TrendingUp },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={`border-r border-border transition-all duration-300 ${
        collapsed ? "w-14" : "w-60"
      }`}
      collapsible="icon"
    >
      <SidebarContent className="gap-0">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-md bg-primary">
            K
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-semibold">Kaidoku</div>
              <div className="text-xs text-muted-foreground">v2.0</div>
            </div>
          )}
        </div>

        {/* Copilot - moved above navigation */}
        <div className="px-4 py-3 border-b border-border">
          <NavLink
            to="copilot"
            className={({ isActive }) =>
              `flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              } px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`
            }
            title={collapsed ? "Copilot" : undefined}
          >
            <Bot className="w-4 h-4" />
            {!collapsed && <span className="text-sm">Copilot</span>}
          </NavLink>
        </div>

        {/* Navigation Section */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "gap-3"
                      }`}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Resources Section */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
              Resources
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "gap-3"
                      }`}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="px-4 py-4 mt-auto border-t border-border">
          <div className="space-y-1">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
              title={collapsed ? "Settings" : undefined}
            >
              <Settings className="w-4 h-4" />
              {!collapsed && <span className="text-sm">Settings</span>}
            </NavLink>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                } px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
              title={collapsed ? "Profile" : undefined}
            >
              <User className="w-4 h-4" />
              {!collapsed && <span className="text-sm">Profile</span>}
            </NavLink>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
