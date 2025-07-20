"use client";

import {
  Activity,
  Bot,
  BookOpen,
  Clock,
  Database,
  FileText,
  Folder,
  Home,
  Play,
  Settings,
  Star,
  Users,
  Video,
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
import { Input } from "@/components/ui/input";
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

// Mock tutorials data
const tutorials = [
  {
    id: "tut_001",
    title: "Getting Started with RNA-seq Analysis",
    description:
      "Learn the fundamentals of RNA sequencing data analysis from raw reads to differential expression",
    category: "RNA-seq",
    difficulty: "Beginner",
    duration: "45 min",
    type: "Video",
    rating: 4.8,
    views: 1250,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tut_002",
    title: "BLAST Search Techniques",
    description:
      "Master the art of sequence similarity searching using BLAST tools",
    category: "Sequence Analysis",
    difficulty: "Beginner",
    duration: "30 min",
    type: "Interactive",
    rating: 4.6,
    views: 980,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tut_003",
    title: "Variant Calling with GATK",
    description:
      "Comprehensive guide to identifying genetic variants using GATK best practices",
    category: "Genomics",
    difficulty: "Intermediate",
    duration: "60 min",
    type: "Video",
    rating: 4.9,
    views: 756,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tut_004",
    title: "Building Custom Workflows",
    description:
      "Create and customize bioinformatics workflows for your specific research needs",
    category: "Workflows",
    difficulty: "Advanced",
    duration: "90 min",
    type: "Interactive",
    rating: 4.7,
    views: 432,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tut_005",
    title: "Data Quality Control",
    description:
      "Essential techniques for assessing and improving sequencing data quality",
    category: "Quality Control",
    difficulty: "Beginner",
    duration: "35 min",
    type: "Video",
    rating: 4.5,
    views: 1100,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "tut_006",
    title: "Phylogenetic Analysis Methods",
    description:
      "Explore evolutionary relationships using modern phylogenetic approaches",
    category: "Phylogenetics",
    difficulty: "Intermediate",
    duration: "75 min",
    type: "Interactive",
    rating: 4.8,
    views: 623,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
];

const categories = [
  "All",
  "RNA-seq",
  "Sequence Analysis",
  "Genomics",
  "Workflows",
  "Quality Control",
  "Phylogenetics",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

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
                    isActive={item.title === "Tutorials"}
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
                    isActive={item.title === "Tutorials"}
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

export default function TutorialsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Tutorials</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tutorials
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  6 new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  33% completion rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Watch Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5h</div>
                <p className="text-xs text-muted-foreground">
                  Total learning time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Certificates
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Earned certificates
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1 max-w-md">
              <Input placeholder="Search tutorials..." className="pl-4" />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border rounded-md">
                <option>All Categories</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select className="px-3 py-2 border rounded-md">
                <option>All Levels</option>
                {difficulties.slice(1).map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tutorials Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        tutorial.type === "Video" ? "default" : "secondary"
                      }
                    >
                      {tutorial.type === "Video" ? (
                        <Video className="h-3 w-3 mr-1" />
                      ) : (
                        <BookOpen className="h-3 w-3 mr-1" />
                      )}
                      {tutorial.type}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base line-clamp-2">
                      {tutorial.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{tutorial.category}</Badge>
                    <Badge
                      variant={
                        tutorial.difficulty === "Beginner"
                          ? "secondary"
                          : tutorial.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="line-clamp-2">
                    {tutorial.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{tutorial.rating}</span>
                    </div>
                    <span>{tutorial.views} views</span>
                  </div>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Start Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
