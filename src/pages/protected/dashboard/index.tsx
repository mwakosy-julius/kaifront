"use client";

import { useState, useEffect } from "react";
import {
  SearchIcon,
  Plus,
  Folder,
  BookOpen,
  Heart,
  Library,
  ChevronRight,
  GitBranch,
  Download,
  Share,
  Zap,
  Users,
  Bell,
  Home,
  PlusCircle,
  UserCircle,
  FilterX,
} from "lucide-react";
import { tools } from "@/lib/services/tools";
import { KaiToolsInterface } from "@/lib/services/tools/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Extended tool interface with additional marketplace metadata
interface MarketplaceToolInterface extends KaiToolsInterface {
  category: string;
  trending?: boolean;
  new?: boolean;
  favorites?: number;
  isFavorited?: boolean;
  usageCount?: number;
  dateAdded?: string;
  tags?: string[];
  imageUrl?: string;
}

// // Mock data for tools (since we can't access the actual API)
// const mockTools: MarketplaceToolInterface[] = [
//   {
//     name: "BLAST Search",
//     description:
//       "Basic Local Alignment Search Tool for sequence similarity searching",
//     frontend_url: "/blast-search",
//     category: "Sequence Analysis",
//     trending: true,
//     new: false,
//     favorites: 245,
//     isFavorited: false,
//     usageCount: 1250,
//     dateAdded: "2024-01-15",
//     tags: ["DNA", "Protein", "Alignment"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//     lastUsed: "2 hours ago",
//   },
//   {
//     name: "GC Content Calculator",
//     description: "Calculate GC content percentage in DNA sequences",
//     frontend_url: "/gc-calculator",
//     category: "Genomics",
//     trending: false,
//     new: true,
//     favorites: 89,
//     isFavorited: true,
//     usageCount: 567,
//     dateAdded: "2024-06-10",
//     tags: ["DNA", "Statistics"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     name: "Phylogenetic Tree Builder",
//     description: "Construct phylogenetic trees from sequence alignments",
//     frontend_url: "/phylo-tree",
//     category: "Comparative Genomics",
//     trending: true,
//     new: false,
//     favorites: 156,
//     isFavorited: false,
//     usageCount: 890,
//     dateAdded: "2024-03-22",
//     tags: ["Evolution", "Tree", "Alignment"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     name: "Genome Visualizer",
//     description: "Interactive genome browser and visualization tool",
//     frontend_url: "/genome-viz",
//     category: "Visualization",
//     trending: false,
//     new: true,
//     favorites: 203,
//     isFavorited: true,
//     usageCount: 1100,
//     dateAdded: "2024-06-05",
//     tags: ["Visualization", "Browser", "Interactive"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     name: "Protein Structure Predictor",
//     description: "Predict protein secondary and tertiary structures",
//     frontend_url: "/protein-structure",
//     category: "Genomics",
//     trending: true,
//     new: false,
//     favorites: 178,
//     isFavorited: false,
//     usageCount: 723,
//     dateAdded: "2024-02-18",
//     tags: ["Protein", "Structure", "Prediction"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     name: "RNA-Seq Analyzer",
//     description: "Comprehensive RNA sequencing data analysis pipeline",
//     frontend_url: "/rna-seq",
//     category: "Sequence Analysis",
//     trending: false,
//     new: true,
//     favorites: 134,
//     isFavorited: true,
//     usageCount: 445,
//     dateAdded: "2024-06-08",
//     tags: ["RNA", "Sequencing", "Pipeline"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     name: "Variant Caller",
//     description: "Identify genetic variants from sequencing data",
//     frontend_url: "/variant-caller",
//     category: "Genomics",
//     trending: true,
//     new: false,
//     favorites: 267,
//     isFavorited: false,
//     usageCount: 1340,
//     dateAdded: "2024-01-30",
//     tags: ["Variants", "SNP", "Genomics"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     name: "Codon Usage Analyzer",
//     description: "Analyze codon usage bias in protein-coding sequences",
//     frontend_url: "/codon-usage",
//     category: "Sequence Analysis",
//     trending: false,
//     new: false,
//     favorites: 92,
//     isFavorited: false,
//     usageCount: 334,
//     dateAdded: "2024-04-12",
//     tags: ["Codon", "Bias", "Analysis"],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
// ];

// Mock data for projects and activity
const mockProjects = [
  {
    id: 1,
    name: "COVID-19 Genome Analysis",
    status: "active",
    progress: 75,
  },
  {
    id: 2,
    name: "Plant Genomics Study",
    status: "completed",
    progress: 100,
  },
  {
    id: 3,
    name: "Protein Folding Research",
    status: "draft",
    progress: 30,
  },
  {
    id: 4,
    name: "Cancer Genomics Pipeline",
    status: "active",
    progress: 60,
  },
  {
    id: 5,
    name: "RNA Expression Analysis",
    status: "active",
    progress: 45,
  },
  {
    id: 6,
    name: "Microbiome Study",
    status: "draft",
    progress: 15,
  },
];

const mockActivity = [
  { id: 1, action: "Used BLAST Search", time: "2h", type: "tool_usage" },
  { id: 2, action: "Favorited GC Calculator", time: "5h", type: "favorite" },
  { id: 3, action: "Completed analysis", time: "1d", type: "project" },
  { id: 4, action: "Started new project", time: "2d", type: "project" },
  { id: 5, action: "Shared results", time: "3d", type: "share" },
  { id: 6, action: "Downloaded dataset", time: "4d", type: "download" },
  {
    id: 7,
    action: "Collaborated on project",
    time: "5d",
    type: "collaboration",
  },
  { id: 8, action: "Updated analysis", time: "1w", type: "tool_usage" },
];

const mockCollections = [
  { id: 1, name: "Sequence Analysis", tools: 5 },
  { id: 2, name: "Genomics Essentials", tools: 8 },
  { id: 3, name: "My Research Tools", tools: 12 },
];

// Tool categories
const CATEGORIES = [
  "Sequence Analysis",
  "Genomics",
  "Comparative Genomics",
  "Visualization",
];

const Dashboard = () => {
  const [toolsData, setToolsData] = useState<MarketplaceToolInterface[]>([]);
  const [displayedTools, setDisplayedTools] = useState<
    MarketplaceToolInterface[]
  >([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch tools and add marketplace metadata
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await tools();
        const baseTools = response as KaiToolsInterface[];

        // Enhance tools with marketplace metadata
        const enhancedTools = baseTools.map((tool) => {
          const category = assignToolCategory(tool.name);
          const isNew = Math.random() > 0.7; // Random for demo
          const isTrending = Math.random() > 0.7; // Random for demo
          const favCount = Math.floor(Math.random() * 100);
          // const imageUrl = getToolImage(tool.name, category);

          return {
            ...tool,
            category,
            trending: isTrending,
            new: isNew,
            favorites: favCount,
            isFavorited: false,
            usageCount: Math.floor(Math.random() * 1000),
            dateAdded: getRandomRecentDate(),
            tags: getToolTags(tool.name),
            // imageUrl,
          };
        });

        setToolsData(enhancedTools);
        setDisplayedTools(enhancedTools);

        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem("toolFavorites");
        if (savedFavorites) {
          const favs = JSON.parse(savedFavorites);
          setFavorites(favs);

          // Mark favorited tools
          setToolsData((prevTools) =>
            prevTools.map((tool) => ({
              ...tool,
              isFavorited: favs.includes(tool.name),
            })),
          );
          setDisplayedTools((prevTools) =>
            prevTools.map((tool) => ({
              ...tool,
              isFavorited: favs.includes(tool.name),
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    fetchTools();
  }, []);

  // Helper function to assign a category based on tool name
  const assignToolCategory = (name: string): string => {
    const nameLC = name.toLowerCase();
    if (
      nameLC.includes("sequence") ||
      nameLC.includes("blast") ||
      nameLC.includes("search") ||
      nameLC.includes("mutator")
    ) {
      return "Sequence Analysis";
    } else if (
      nameLC.includes("gc") ||
      nameLC.includes("codon") ||
      nameLC.includes("compression") ||
      nameLC.includes("variant")
    ) {
      return "Genomics";
    } else if (
      nameLC.includes("phylogenetic") ||
      nameLC.includes("alignment") ||
      nameLC.includes("meta")
    ) {
      return "Comparative Genomics";
    } else {
      return "Visualization";
    }
  };

  // Helper function to generate random date in the last 90 days
  const getRandomRecentDate = (): string => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 90);
    now.setDate(now.getDate() - daysAgo);
    return now.toISOString().split("T")[0];
  };

  // Helper function to assign relevant tags to tools
  const getToolTags = (name: string): string[] => {
    const nameLC = name.toLowerCase();
    const tags: string[] = [];

    if (nameLC.includes("dna") || nameLC.includes("sequence")) tags.push("DNA");
    if (nameLC.includes("rna")) tags.push("RNA");
    if (nameLC.includes("protein")) tags.push("Protein");
    if (nameLC.includes("phylogenetic") || nameLC.includes("tree"))
      tags.push("Evolution");
    if (nameLC.includes("visual")) tags.push("Visualization");
    if (nameLC.includes("align")) tags.push("Alignment");
    if (nameLC.includes("variant")) tags.push("Genomics");

    // Add at least one tag if none were matched
    if (tags.length === 0) tags.push("Bioinformatics");

    return tags;
  };

  // Filter tools based on search query and active category
  useEffect(() => {
    let filtered = [...toolsData];

    if (searchQuery) {
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tool.tags &&
            tool.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
    }

    if (activeCategory) {
      filtered = filtered.filter((tool) => tool.category === activeCategory);
    }

    setDisplayedTools(filtered);
  }, [searchQuery, activeCategory, toolsData]);

  // Toggle favorite status for a tool
  const toggleFavorite = (toolName: string) => {
    let newFavorites: string[];

    if (favorites.includes(toolName)) {
      newFavorites = favorites.filter((name) => name !== toolName);
    } else {
      newFavorites = [...favorites, toolName];
    }

    setFavorites(newFavorites);
    localStorage.setItem("toolFavorites", JSON.stringify(newFavorites));

    // Update tools data
    setToolsData((prevTools) =>
      prevTools.map((tool) => ({
        ...tool,
        isFavorited: newFavorites.includes(tool.name),
      })),
    );
    setDisplayedTools((prevTools) =>
      prevTools.map((tool) => ({
        ...tool,
        isFavorited: newFavorites.includes(tool.name),
      })),
    );
  };

  // Filter functions for different tabs
  const getNewTools = () => displayedTools.filter((tool) => tool.new);

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory(null);
    setSearchQuery("");
  };
  return (
    <div className="flex h-screen bg-background text-foreground p-4 gap-4">
      {/* Left Sidebar - Minimized */}
      <div className="w-60 bg-card border border-border rounded-lg flex flex-col transition-all duration-300 hover:shadow-md hover:border-border/80 hover:bg-card/95">
        {/* Library Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Library className="w-4 h-4" />
              <h2 className="font-medium text-sm">Your Library</h2>
            </div>
            <Button variant="ghost" size="icon" className="w-6 h-6">
              <PlusCircle className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Library Content */}
        <ScrollArea className="flex-1">
          {/* Collections */}
          <div className="px-4 pb-4">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              COLLECTIONS
            </h3>
            <div className="space-y-1">
              {mockCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-all duration-200 cursor-pointer group hover:shadow-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {collection.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {collection.tools} tools
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="mx-3" />

          {/* Recent Activity - Minimized */}
          <div className="p-4">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              RECENT ACTIVITY
            </h3>
            <div className="space-y-2">
              {mockActivity.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-2 p-1 rounded-md hover:bg-accent/50 transition-all duration-200 cursor-pointer"
                >
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="text-xs">
                      {activity.type === "tool_usage" ? (
                        <Zap className="w-2 h-2" />
                      ) : activity.type === "favorite" ? (
                        <Heart className="w-2 h-2" />
                      ) : activity.type === "project" ? (
                        <GitBranch className="w-2 h-2" />
                      ) : activity.type === "share" ? (
                        <Share className="w-2 h-2" />
                      ) : activity.type === "download" ? (
                        <Download className="w-2 h-2" />
                      ) : (
                        <Users className="w-2 h-2" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-card border border-border rounded-lg transition-all duration-300 hover:shadow-lg hover:border-border/80 hover:bg-card/98">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center justify-center flex-1">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:scale-105 transition-transform duration-200"
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
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-105 transition-transform duration-200"
            >
              <UserCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Featured Tools Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Featured Tools</h2>
                  <p className="text-sm text-muted-foreground">
                    Explore tools by research area
                  </p>
                </div>
                {(activeCategory || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <FilterX className="w-4 h-4 mr-1" />
                    Reset filters
                  </Button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    className="cursor-pointer px-3 py-1 text-xs rounded-full transition-all duration-200 hover:scale-105 hover:shadow-sm"
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category ? null : category,
                      )
                    }
                  >
                    <Folder className="w-3 h-3 mr-1" />
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Tools grid based on active category or all tools */}
              <div className="grid grid-cols-4 gap-3">
                {displayedTools.slice(0, 8).map((tool) => (
                  <ToolCard key={tool.name} tool={tool} variant="minimal" />
                ))}
              </div>

              {displayedTools.length > 10 && (
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Load more tools
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </section>

            {/* New Releases */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">New releases</h2>
                  <p className="text-sm text-muted-foreground">
                    Fresh tools for your research
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200"
                >
                  Show all
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {getNewTools()
                  .slice(0, 5)
                  .map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
              </div>
            </section>

            {/* Trending */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recommended for you</h2>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-200"
                >
                  Show all
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {getRecommendedTools()
                  .slice(0, 5)
                  .map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Minimized Projects */}
      <div className="w-60 bg-card border border-border rounded-lg flex flex-col transition-all duration-300 hover:shadow-md hover:border-border/80 hover:bg-card/95">
        {/* Projects Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">Your Projects</h3>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 hover:scale-105 transition-transform duration-200"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {/* Minimal Projects */}
          <div className="p-4">
            <div className="space-y-2">
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-2 rounded-md hover:bg-accent/50 transition-all duration-200 cursor-pointer hover:shadow-sm hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-medium truncate flex-1">
                      {project.name}
                    </h4>
                    <Badge
                      variant={
                        project.status === "active"
                          ? "default"
                          : project.status === "completed"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs ml-1 transition-all duration-200 hover:scale-105"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {project.progress}%
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-3 hover:scale-105 transition-transform duration-200"
              size="sm"
            >
              <Folder className="w-3 h-3 mr-1" />
              View all
            </Button>

            <Button
              className="w-full mt-2 hover:scale-105 transition-transform duration-200"
              size="sm"
            >
              <Plus className="w-3 h-3 mr-1" />
              New project
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

// Enhanced tool card component
const ToolCard = ({
  tool,
  variant = "default",
}: {
  tool: MarketplaceToolInterface;
  variant?: "minimal" | "default";
}) => {
  if (variant === "minimal") {
    return (
      <div className="group flex items-center space-x-3 bg-card hover:bg-accent/50 rounded-md p-2 transition-all duration-200 cursor-pointer hover:shadow-sm hover:scale-[1.02]">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <div className="text-white text-sm font-bold">
            {tool.name.charAt(0)}
          </div>
        </div>
        <div className="space-y-0.5">
          <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {tool.category}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-card hover:bg-accent/50 rounded-lg p-3 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02] hover:-translate-y-1">
      <div className="relative mb-3 overflow-hidden rounded-md">
        <img
          src={tool.imageUrl || "/placeholder.svg"}
          alt={tool.name}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {tool.new && (
            <Badge className="text-xs bg-green-500 hover:bg-green-500 transition-all duration-200 group-hover:scale-105">
              New
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-200">
          {tool.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {tool.description}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
