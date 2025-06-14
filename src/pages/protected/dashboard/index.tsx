import { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  Search as SearchIcon,
  TrendingUp,
  Sparkles,
  FilterX,
} from "lucide-react";

// local imports
import { tools } from "@/lib/services/tools";
import { KaiToolsInterface } from "@/lib/services/tools/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getToolImage } from "@/lib/constants/tool-images";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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

// Tool categories from landing page
const CATEGORIES = [
  "Sequence Analysis",
  "Genomics",
  "Comparative Genomics",
  "Visualization",
];

// Featured playlist categories
// const TOOL_PLAYLISTS = [
//   {
//     title: "Genomics Essentials",
//     description: "Essential tools for genomics research",
//     image: TOOL_IMAGES.genomics,
//     category: "Genomics",
//     route: "/protected/tools/genomics",
//   },
//   {
//     title: "Transcriptomics Toolkit",
//     description: "Tools for analyzing gene expression data",
//     image: TOOL_IMAGES.transcriptomics,
//     category: "Genomics",
//     route: "/protected/tools/transcriptomics",
//   },
//   {
//     title: "Variant Analysis Suite",
//     description: "Tools for identifying genetic variants",
//     image: TOOL_IMAGES.variantAnalysis,
//     category: "Genomics",
//     route: "/protected/tools/variant-analysis",
//   },
//   {
//     title: "Genome Assembly Resources",
//     description: "Resources for assembling genomes",
//     image: TOOL_IMAGES.genomeAssembly,
//     category: "Genomics",
//     route: "/protected/tools/genome-assembly",
//   },
// ];

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
          const imageUrl = getToolImage(tool.name, category);

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
            imageUrl,
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
            }))
          );
          setDisplayedTools((prevTools) =>
            prevTools.map((tool) => ({
              ...tool,
              isFavorited: favs.includes(tool.name),
            }))
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
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ))
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
      }))
    );
    setDisplayedTools((prevTools) =>
      prevTools.map((tool) => ({
        ...tool,
        isFavorited: newFavorites.includes(tool.name),
      }))
    );
  };

  // Filter functions for different tabs
  const getTrendingTools = () => displayedTools.filter((tool) => tool.trending);
  const getNewTools = () => displayedTools.filter((tool) => tool.new);
  const getFavoritedTools = () =>
    displayedTools.filter((tool) => tool.isFavorited);
  const getPopularTools = () =>
    [...displayedTools]
      .sort((a, b) => (b.favorites || 0) - (a.favorites || 0))
      .slice(0, 6);

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory(null);
    setSearchQuery("");
  };

  return (
    <div className="w-full max-w-6xl px-2 py-8 mx-auto md:px-8">
      {/* Header */}
      <div className="relative w-full mb-10">
        <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools, playlists, or users"
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Featured Tool Playlists Section */}
      {/* <section className="mb-12">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-border/40">
          <div>
            <h2 className="text-3xl font-bold">Featured Tools</h2>
            <p className="text-muted-foreground">
              Essential tools and collections for your research
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            Explore All Collections <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div>
          <ToolPlaylists playlists={TOOL_PLAYLISTS} />
        </div>
      </section> */}

      {/* New Tools Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between pb-2 mb-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">New Tools</h2>
            <p className="text-sm text-muted-foreground">
              Recently added to our platform
            </p>
          </div>
          <Button variant="link" className="text-primary" onClick={() => {}}>
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getNewTools()
            .slice(0, 3)
            .map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
        </div>
      </section>

      {/* Recommended Tools Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between pb-2 mb-6 border-b border-border/40">
          <div>
            <h2 className="text-2xl font-semibold">Recommended Tools</h2>
            <p className="text-sm text-muted-foreground">
              Popular tools you might find useful
            </p>
          </div>
          <Button variant="link" className="text-primary" onClick={() => {}}>
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getPopularTools()
            .slice(0, 3)
            .map((tool) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
        </div>
      </section>

      {/* All Tools Section */}
      <section className="pt-4 mt-10 border-t border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">All Tools</h2>
            <p className="text-sm text-muted-foreground">
              Browse the complete collection
            </p>
          </div>

          {/* Category pills */}
          <div className="flex-wrap hidden gap-2 md:flex">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category ? null : category
                  )
                }
              >
                {category}
              </Badge>
            ))}

            {(activeCategory || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={resetFilters}
              >
                <FilterX className="w-4 h-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="flex flex-wrap justify-end p-1 px-0 mb-6 ml-auto space-x-2 w-fit h-fit">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="new">
              <Sparkles className="w-4 h-4 mr-1" />
              New
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="w-4 h-4 mr-1" />
              Favorites
            </TabsTrigger>
          </TabsList>

          {/* All tools */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedTools.length > 0 ? (
                displayedTools.map((tool) => (
                  <ToolCard
                    key={tool.name}
                    tool={tool}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center col-span-4 py-12 text-center">
                  <p className="text-muted-foreground">
                    No tools found matching your search criteria.
                  </p>
                  <Button variant="link" onClick={resetFilters}>
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Trending tools */}
          <TabsContent value="trending">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTrendingTools().length > 0 ? (
                getTrendingTools().map((tool) => (
                  <ToolCard
                    key={tool.name}
                    tool={tool}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center col-span-4 py-12 text-center">
                  <p className="text-muted-foreground">
                    No trending tools found.
                  </p>
                  {(activeCategory || searchQuery) && (
                    <Button variant="link" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* New tools */}
          <TabsContent value="new">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getNewTools().length > 0 ? (
                getNewTools().map((tool) => (
                  <ToolCard
                    key={tool.name}
                    tool={tool}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center col-span-4 py-12 text-center">
                  <p className="text-muted-foreground">No new tools found.</p>
                  {(activeCategory || searchQuery) && (
                    <Button variant="link" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Favorite tools */}
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getFavoritedTools().length > 0 ? (
                getFavoritedTools().map((tool) => (
                  <ToolCard
                    key={tool.name}
                    tool={tool}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center col-span-4 py-12 text-center">
                  <p className="text-muted-foreground">
                    No favorite tools yet. Mark tools as favorites to see them
                    here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

// Enhanced tool card with favorite button, metadata, and image
const ToolCard = ({
  tool,
  onFavoriteToggle,
  showFavorite = true,
}: {
  tool: MarketplaceToolInterface;
  onFavoriteToggle: (name: string) => void;
  showFavorite?: boolean;
}) => {
  return (
    <Link
      to={`tools${tool.frontend_url}`}
      className={cn("h-full flex flex-col space-y-4")}
    >
      {/* Image section */}
      <div
        className="relative overflow-hidden rounded-lg h-52"
        style={{
          background: "linear-gradient(to bottom, #1a1a1a, #0a0a0a)",
        }}
      >
        <img
          src={tool.imageUrl || getToolImage(tool.name, tool.category)}
          alt={tool.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-transparent" /> */}
        {showFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 rounded-full bg-background/70 text-foreground",
              "hover:bg-background/90"
            )}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onFavoriteToggle(tool.name);
            }}
            title={
              tool.isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {tool.isFavorited ? (
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            ) : (
              <Star className="w-4 h-4" />
            )}
            <span className="sr-only">Toggle favorite</span>
          </Button>
        )}

        {/* Category label */}
        {/* <div
          className={cn(
            "absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded text-white",
            tool.category?.toLowerCase().includes("genom")
              ? isDark
                ? "bg-genomics-dark"
                : "bg-genomics"
              : tool.category?.toLowerCase().includes("proteo")
              ? isDark
                ? "bg-proteomics-dark"
                : "bg-proteomics"
              : isDark
              ? "bg-metabolomics-dark"
              : "bg-metabolomics"
          )}
        >
          {tool.category}
        </div> */}

        {/* New/Trending badges */}
        {/* <div className="absolute flex gap-1 bottom-2 left-2">
          {tool.new && (
            <Badge className="text-white bg-emerald-500 hover:bg-emerald-500/90">
              New
            </Badge>
          )}
          {tool.trending && (
            <Badge className="text-white bg-amber-500 hover:bg-amber-500/90">
              Trending
            </Badge>
          )}
        </div> */}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="pb-2">
          <div className="text-lg font-medium">{tool.name}</div>
        </div>

        <div className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tool.description}
          </p>

          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tool.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
