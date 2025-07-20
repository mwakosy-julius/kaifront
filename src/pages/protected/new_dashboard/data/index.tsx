"use client";

import {
  Activity,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share,
  Upload,
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
import { Progress } from "@/components/ui/progress";
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

// Mock data
const datasets = [
  {
    id: "ds_001",
    name: "RNA_seq_cancer_samples_batch1.fastq.gz",
    type: "FASTQ",
    size: "2.4 GB",
    project: "Cancer Genomics Study 2024",
    uploaded: "2024-01-15",
    status: "Ready",
    quality: "High",
    samples: 24,
    description: "RNA sequencing data from tumor and normal tissue samples",
  },
  {
    id: "ds_002",
    name: "reference_genome_hg38.fasta",
    type: "FASTA",
    size: "3.1 GB",
    project: "Reference Data",
    uploaded: "2024-01-10",
    status: "Ready",
    quality: "Validated",
    samples: 1,
    description: "Human reference genome assembly GRCh38/hg38",
  },
  {
    id: "ds_003",
    name: "microbiome_16S_sequences.fastq",
    type: "FASTQ",
    size: "856 MB",
    project: "Microbiome Diversity Analysis",
    uploaded: "2024-01-12",
    status: "Processing",
    quality: "Medium",
    samples: 48,
    description: "16S rRNA gene sequences from gut microbiome samples",
  },
  {
    id: "ds_004",
    name: "protein_sequences_uniprot.fasta",
    type: "FASTA",
    size: "1.8 GB",
    project: "Protein Analysis",
    uploaded: "2024-01-08",
    status: "Ready",
    quality: "High",
    samples: 542000,
    description: "UniProt protein sequence database subset",
  },
  {
    id: "ds_005",
    name: "variant_calls_WGS.vcf",
    type: "VCF",
    size: "445 MB",
    project: "Genomics Pipeline",
    uploaded: "2024-01-14",
    status: "Ready",
    quality: "High",
    samples: 12,
    description: "Whole genome sequencing variant calls",
  },
];

const folders = [
  {
    id: "folder_001",
    name: "Cancer_Study_2024",
    files: 156,
    size: "24.8 GB",
    lastModified: "2 days ago",
    type: "project",
  },
  {
    id: "folder_002",
    name: "Reference_Genomes",
    files: 8,
    size: "12.4 GB",
    lastModified: "1 week ago",
    type: "reference",
  },
  {
    id: "folder_003",
    name: "Microbiome_Data",
    files: 89,
    size: "8.7 GB",
    lastModified: "3 days ago",
    type: "project",
  },
  {
    id: "folder_004",
    name: "Shared_Datasets",
    files: 23,
    size: "5.2 GB",
    lastModified: "5 days ago",
    type: "shared",
  },
];

const recentUploads = [
  {
    name: "sample_batch_3.fastq.gz",
    size: "1.2 GB",
    progress: 85,
    status: "Uploading",
    timeRemaining: "2 min",
  },
  {
    name: "annotation_file.gff3",
    size: "45 MB",
    progress: 100,
    status: "Complete",
    timeRemaining: "Complete",
  },
  {
    name: "expression_matrix.csv",
    size: "234 MB",
    progress: 100,
    status: "Complete",
    timeRemaining: "Complete",
  },
];

const dataTypes = [
  "All",
  "FASTQ",
  "FASTA",
  "VCF",
  "BAM",
  "SAM",
  "GFF",
  "CSV",
  "TSV",
];
const qualityLevels = ["All", "High", "Medium", "Low", "Validated"];

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
                  <SidebarMenuButton asChild isActive={item.title === "Data"}>
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
              <Link href="/copilot">
                <Bot />
                <span>Copilot</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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

export default function DataPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Data Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Data
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Data
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Storage
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4 TB</div>
                <p className="text-xs text-muted-foreground">
                  68% of 3.5 TB quota
                </p>
                <Progress value={68} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Files
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+23 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Uploads
                </CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  2.1 GB remaining
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Shared Files
                </CardTitle>
                <Share className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  With 12 collaborators
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="datasets" className="space-y-4">
            <TabsList>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="uploads">Recent Uploads</TabsTrigger>
            </TabsList>

            <TabsContent value="datasets" className="space-y-4">
              {/* Search and Filter Bar */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 gap-2">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search datasets..." className="pl-8" />
                  </div>
                  <Select defaultValue="All">
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dataTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="All">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Datasets Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Datasets</CardTitle>
                  <CardDescription>
                    Manage your bioinformatics datasets and files
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Quality</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datasets.map((dataset) => (
                        <TableRow key={dataset.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{dataset.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {dataset.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{dataset.type}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {dataset.size}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {dataset.project}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dataset.quality === "High" ||
                                dataset.quality === "Validated"
                                  ? "default"
                                  : dataset.quality === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {dataset.quality}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {dataset.uploaded}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dataset.status === "Ready"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {dataset.status}
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
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Share</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Move to Folder
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Rename</DropdownMenuItem>
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
            </TabsContent>

            <TabsContent value="folders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Folders</CardTitle>
                  <CardDescription>
                    Organize your data into folders and collections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {folders.map((folder) => (
                      <Card
                        key={folder.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-md">
                                <FolderOpen className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{folder.name}</h3>
                                <Badge variant="outline" className="mt-1">
                                  {folder.type}
                                </Badge>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Open</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex justify-between">
                              <span>{folder.files} files</span>
                              <span>{folder.size}</span>
                            </div>
                            <div>Last modified: {folder.lastModified}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[120px]">
                        <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Create New Folder
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uploads" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                  <CardDescription>
                    Track your file uploads and their progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUploads.map((upload, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-medium">{upload.name}</p>
                            <Badge
                              variant={
                                upload.status === "Complete"
                                  ? "default"
                                  : upload.status === "Uploading"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {upload.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{upload.size}</span>
                              <span>{upload.timeRemaining}</span>
                            </div>
                            <Progress value={upload.progress} />
                          </div>
                        </div>
                        <div className="ml-4">
                          {upload.status === "Complete" ? (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upload Area */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Data</CardTitle>
                  <CardDescription>
                    Drag and drop files or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">
                      Drop files here to upload
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports FASTQ, FASTA, VCF, BAM, SAM, GFF, CSV, TSV files
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
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
