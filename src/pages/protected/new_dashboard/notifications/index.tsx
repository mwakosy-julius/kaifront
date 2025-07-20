"use client";

import {
  Activity,
  Bell,
  Bot,
  CheckCircle,
  Database,
  FileText,
  Folder,
  Home,
  Info,
  MoreHorizontal,
  Settings,
  Trash2,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Navigation items
const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Copilot", url: "/copilot", icon: Bot },
  { title: "Tools", url: "/tools", icon: Zap },
  { title: "Workflows", url: "/workflows", icon: Workflow },
  { title: "Data", url: "/data", icon: Database },
  { title: "Results", url: "/results", icon: FileText },
  { title: "Projects", url: "/projects", icon: Folder },
];

const resourcesItems = [
  { title: "Tutorials", url: "/tutorials", icon: FileText },
  { title: "Notifications", url: "/notifications", icon: Activity },
  { title: "Upgrade", url: "/upgrade", icon: Zap },
];

// Mock notifications data
const notifications = [
  {
    id: "notif_001",
    type: "success",
    title: "RNA-seq Analysis Completed",
    message:
      "Your RNA-seq differential expression analysis has finished successfully. 1,247 differentially expressed genes identified.",
    timestamp: "2 minutes ago",
    read: false,
    category: "Analysis",
  },
  {
    id: "notif_002",
    type: "info",
    title: "New Tutorial Available",
    message:
      "Learn about advanced BLAST techniques in our latest tutorial series.",
    timestamp: "1 hour ago",
    read: false,
    category: "Tutorial",
  },
  {
    id: "notif_003",
    type: "warning",
    title: "Storage Quota Warning",
    message:
      "You're using 85% of your storage quota. Consider upgrading or cleaning up old files.",
    timestamp: "3 hours ago",
    read: true,
    category: "System",
  },
  {
    id: "notif_004",
    type: "success",
    title: "Workflow Shared",
    message:
      "Dr. Smith has shared the 'Variant Calling Pipeline' workflow with you.",
    timestamp: "5 hours ago",
    read: true,
    category: "Collaboration",
  },
  {
    id: "notif_005",
    type: "error",
    title: "Analysis Failed",
    message:
      "Phylogenetic tree construction failed due to insufficient memory. Please try with a smaller dataset.",
    timestamp: "1 day ago",
    read: false,
    category: "Analysis",
  },
  {
    id: "notif_006",
    type: "info",
    title: "System Maintenance",
    message:
      "Scheduled maintenance will occur on Sunday, 2 AM - 4 AM EST. Some services may be unavailable.",
    timestamp: "2 days ago",
    read: true,
    category: "System",
  },
];

const notificationSettings = [
  {
    category: "Analysis Completion",
    description: "Get notified when your analyses finish",
    enabled: true,
  },
  {
    category: "Workflow Updates",
    description: "Notifications about workflow sharing and updates",
    enabled: true,
  },
  {
    category: "System Alerts",
    description: "Important system notifications and maintenance",
    enabled: true,
  },
  {
    category: "Storage Warnings",
    description: "Alerts about storage quota and usage",
    enabled: true,
  },
  {
    category: "New Features",
    description: "Updates about new platform features",
    enabled: false,
  },
  {
    category: "Tutorials",
    description: "Notifications about new learning content",
    enabled: false,
  },
];

function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BioAnalytics</span>
                  <span className="truncate text-xs">Platform v2.1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === "Notifications"}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
              {resourcesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === "Notifications"}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <Users />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Tabs defaultValue="notifications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="notifications">All Notifications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-4">
              {/* Overview Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Notifications
                    </CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {notifications.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unread
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{unreadCount}</div>
                    <p className="text-xs text-muted-foreground">
                      Require attention
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Analysis Updates
                    </CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        notifications.filter((n) => n.category === "Analysis")
                          .length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Job completions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      System Alerts
                    </CardTitle>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        notifications.filter((n) => n.category === "System")
                          .length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Important updates
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications List */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>
                    Stay updated with your analysis progress and system updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                          !notification.read
                            ? "bg-muted/50 border-primary/20"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === "success" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {notification.type === "info" && (
                            <Info className="h-5 w-5 text-blue-500" />
                          )}
                          {notification.type === "warning" && (
                            <Activity className="h-5 w-5 text-yellow-500" />
                          )}
                          {notification.type === "error" && (
                            <Activity className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3
                                className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {notification.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as{" "}
                                  {notification.read ? "Unread" : "Read"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Customize which notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {notificationSettings.map((setting, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <div className="font-medium">{setting.category}</div>
                          <div className="text-sm text-muted-foreground">
                            {setting.description}
                          </div>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Settings</CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </div>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Browser push notifications
                        </div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Critical alerts via SMS
                        </div>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
