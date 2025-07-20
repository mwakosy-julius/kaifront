"use client";

import {
  Activity,
  BarChart3,
  Calendar,
  Database,
  FileText,
  Folder,
  Home,
  MoreHorizontal,
  Plus,
  Settings,
  Users,
  Workflow,
  Zap,
  Bot,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Progress } from "@/components/ui/progress";
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

// Mock projects data
const projects = [
  {
    id: "proj_001",
    name: "Cancer Genomics Study 2024",
    description:
      "Comprehensive analysis of tumor samples using RNA-seq and variant calling",
    status: "Active",
    progress: 75,
    members: [
      {
        name: "Dr. Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DS",
      },
      {
        name: "Dr. Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DJ",
      },
      {
        name: "Dr. Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DB",
      },
    ],
    datasets: 24,
    analyses: 18,
    results: 12,
    created: "2024-01-01",
    deadline: "2024-06-30",
    tags: ["RNA-seq", "Variant Calling", "Cancer"],
  },
  {
    id: "proj_002",
    name: "Microbiome Diversity Analysis",
    description:
      "Metagenomic analysis of gut microbiome samples from different populations",
    status: "Active",
    progress: 45,
    members: [
      {
        name: "Dr. Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DD",
      },
      {
        name: "Dr. Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DW",
      },
    ],
    datasets: 36,
    analyses: 8,
    results: 5,
    created: "2024-02-15",
    deadline: "2024-08-15",
    tags: ["Metagenomics", "Microbiome", "16S"],
  },
  {
    id: "proj_003",
    name: "Plant Phylogenetics Project",
    description: "Evolutionary relationships among flowering plant species",
    status: "Completed",
    progress: 100,
    members: [
      {
        name: "Dr. Green",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DG",
      },
      {
        name: "Dr. White",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DW",
      },
      {
        name: "Dr. Black",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DB",
      },
    ],
    datasets: 15,
    analyses: 22,
    results: 18,
    created: "2023-09-01",
    deadline: "2024-01-31",
    tags: ["Phylogenetics", "Plants", "Evolution"],
  },
  {
    id: "proj_004",
    name: "Protein Structure Prediction",
    description: "AI-based protein folding prediction for novel enzymes",
    status: "Planning",
    progress: 15,
    members: [
      {
        name: "Dr. Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DT",
      },
    ],
    datasets: 8,
    analyses: 2,
    results: 0,
    created: "2024-01-20",
    deadline: "2024-09-30",
    tags: ["Protein", "AI", "Structure"],
  },
];

const recentActivity = [
  {
    project: "Cancer Genomics Study 2024",
    action: "New RNA-seq analysis completed",
    user: "Dr. Smith",
    time: "2 hours ago",
  },
  {
    project: "Microbiome Diversity Analysis",
    action: "Dataset uploaded: Sample_Batch_3",
    user: "Dr. Davis",
    time: "4 hours ago",
  },
  {
    project: "Cancer Genomics Study 2024",
    action: "Variant calling workflow started",
    user: "Dr. Johnson",
    time: "6 hours ago",
  },
  {
    project: "Protein Structure Prediction",
    action: "Project created",
    user: "Dr. Taylor",
    time: "1 day ago",
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
                    isActive={item.title === "Projects"}
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
                  <SidebarMenuButton asChild>
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

export default function ProjectsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Projects</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <Folder className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 active, 9 completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  Across all projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Datasets
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+8 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Analyses Run
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Projects List */}
            <div className="lg:col-span-2 space-y-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">
                            {project.name}
                          </CardTitle>
                          <Badge
                            variant={
                              project.status === "Active"
                                ? "default"
                                : project.status === "Completed"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.members.map((member, index) => (
                          <Avatar
                            key={index}
                            className="h-8 w-8 border-2 border-background"
                          >
                            <AvatarImage
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback className="text-xs">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{project.datasets} datasets</span>
                        <span>{project.analyses} analyses</span>
                        <span>{project.results} results</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {project.deadline}</span>
                      </div>
                      <div className="flex gap-1">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across all projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.project}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>by {activity.user}</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
