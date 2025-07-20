"use client";

import {
  Activity,
  BarChart3,
  Database,
  FileText,
  Filter,
  Folder,
  Home,
  Play,
  Search,
  Settings,
  Star,
  Users,
  Workflow,
  Zap,
  Bot,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Mock tools data
const tools = [
  {
    id: "blast",
    name: "BLAST",
    description:
      "Basic Local Alignment Search Tool for sequence similarity searching",
    category: "Sequence Analysis",
    version: "2.14.0",
    popularity: 95,
    isFavorite: true,
    lastUsed: "2 days ago",
    icon: Zap,
  },
  {
    id: "fastqc",
    name: "FastQC",
    description: "Quality control tool for high throughput sequence data",
    category: "Quality Control",
    version: "0.12.1",
    popularity: 88,
    isFavorite: true,
    lastUsed: "1 week ago",
    icon: BarChart3,
  },
  {
    id: "bwa",
    name: "BWA",
    description:
      "Burrows-Wheeler Aligner for mapping sequences to reference genome",
    category: "Alignment",
    version: "0.7.17",
    popularity: 82,
    isFavorite: false,
    lastUsed: "3 days ago",
    icon: Activity,
  },
  {
    id: "samtools",
    name: "SAMtools",
    description: "Tools for manipulating alignments in SAM/BAM format",
    category: "File Processing",
    version: "1.17",
    popularity: 90,
    isFavorite: true,
    lastUsed: "1 day ago",
    icon: Database,
  },
  {
    id: "gatk",
    name: "GATK",
    description: "Genome Analysis Toolkit for variant discovery",
    category: "Variant Calling",
    version: "4.4.0",
    popularity: 85,
    isFavorite: false,
    lastUsed: "5 days ago",
    icon: Activity,
  },
  {
    id: "hisat2",
    name: "HISAT2",
    description: "Graph-based alignment of next generation sequencing reads",
    category: "Alignment",
    version: "2.2.1",
    popularity: 78,
    isFavorite: false,
    lastUsed: "1 week ago",
    icon: Activity,
  },
];

const categories = [
  "All",
  "Sequence Analysis",
  "Quality Control",
  "Alignment",
  "File Processing",
  "Variant Calling",
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
                  <SidebarMenuButton asChild isActive={item.title === "Tools"}>
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

export default function ToolsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Tools</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tools..." className="pl-8" />
              </div>
              <Select defaultValue="All">
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Favorites Only
              </Button>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <tool.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{tool.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            v{tool.version}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Star
                        className={`h-4 w-4 ${tool.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Last used: {tool.lastUsed}</span>
                    <span>Popularity: {tool.popularity}%</span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Launch
                    </Button>
                    <Button variant="outline" size="sm">
                      Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
