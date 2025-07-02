"use client";

import type * as React from "react";
import {
  Plus,
  FileText,
  Database,
  Inbox,
  Search,
  Settings,
  BookOpen,
  Users,
  Zap,
  CreditCard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Navigation items
const workspaceItems = [
  {
    title: "My Workflows",
    count: 3,
    icon: FileText,
    onClick: () => {},
  },
  {
    title: "My Datasets",
    count: 12,
    icon: Database,
    onClick: () => {},
  },
  {
    title: "My Files",
    icon: FileText,
    onClick: () => {},
  },
  {
    title: "Inbox",
    icon: Inbox,
    onClick: () => {},
  },
];

const resourceItems = [
  {
    title: "Explore Templates",
    icon: Search,
    onClick: () => {},
  },
  {
    title: "Documentation",
    icon: BookOpen,
    onClick: () => {},
  },
  {
    title: "Community Forum",
    icon: Users,
    onClick: () => {},
  },
  {
    title: "Models Lab",
    icon: Zap,
    onClick: () => {},
  },
  {
    title: "Upgrade Subscription",
    icon: CreditCard,
    onClick: () => {},
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNewWorkflow?: () => void;
}

export function AppSidebar({ onNewWorkflow, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            K
          </div>
          <span className="font-semibold text-lg">Kaidoku</span>
        </div>
        <Button
          onClick={onNewWorkflow}
          className="mx-2 justify-start gap-2 bg-transparent"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          New Workflow
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.count && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ({item.count})
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Account & Billing</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 py-2 text-xs text-muted-foreground">
          <div className="font-medium">Kaidoku User</div>
          <div>user@example.com</div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
