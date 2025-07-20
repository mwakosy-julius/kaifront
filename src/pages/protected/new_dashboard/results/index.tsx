"use client";

import {
  Activity,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Folder,
  Home,
  MoreHorizontal,
  Search,
  Settings,
  Share,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

// Mock results data
const results = [
  {
    id: "result_001",
    name: "RNA-seq_Sample_A_vs_B",
    type: "Differential Expression",
    tool: "DESeq2",
    project: "Cancer Study 2024",
    size: "45.2 MB",
    created: "2024-01-15",
    status: "Complete",
    files: 8,
    description:
      "Differential gene expression analysis between treatment and control groups",
  },
  {
    id: "result_002",
    name: "BLAST_protein_search",
    type: "Sequence Alignment",
    tool: "BLAST",
    project: "Protein Analysis",
    size: "12.8 MB",
    created: "2024-01-14",
    status: "Complete",
    files: 3,
    description: "Protein sequence similarity search against UniProt database",
  },
  {
    id: "result_003",
    name: "Variant_calling_WGS",
    type: "Variant Analysis",
    tool: "GATK",
    project: "Genomics Pipeline",
    size: "156.7 MB",
    created: "2024-01-13",
    status: "Complete",
    files: 12,
    description: "Whole genome sequencing variant calling and annotation",
  },
  {
    id: "result_004",
    name: "Phylogenetic_tree",
    type: "Phylogenetics",
    tool: "RAxML",
    project: "Evolution Study",
    size: "8.4 MB",
    created: "2024-01-12",
    status: "Complete",
    files: 5,
    description: "Maximum likelihood phylogenetic reconstruction",
  },
  {
    id: "result_005",
    name: "Metagenome_assembly",
    type: "Assembly",
    tool: "SPAdes",
    project: "Microbiome Study",
    size: "234.1 MB",
    created: "2024-01-11",
    status: "Processing",
    files: 15,
    description: "De novo assembly of metagenomic sequencing data",
  },
];

const resultTypes = [
  "All",
  "Differential Expression",
  "Sequence Alignment",
  "Variant Analysis",
  "Phylogenetics",
  "Assembly",
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
                    isActive={item.title === "Results"}
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

export default function ResultsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Results</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Results
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+12 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Storage Used
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 TB</div>
                <p className="text-xs text-muted-foreground">68% of quota</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Downloads
                </CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Shared Results
                </CardTitle>
                <Share className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  With collaborators
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search results..." className="pl-8" />
              </div>
              <Select defaultValue="All">
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resultTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Browse and manage your bioinformatics analysis results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tool</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{result.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{result.type}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {result.tool}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {result.project}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {result.size}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {result.created}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            result.status === "Complete"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {result.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem>Export</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
