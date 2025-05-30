import { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  Search as SearchIcon,
  Clock,
  TrendingUp,
  Sparkles,
  FilterX,
} from "lucide-react";

// local imports
import { tools } from "@/lib/services/tools";
import { KaiToolsInterface } from "@/lib/services/tools/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
}

// Tool categories from landing page
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
    <div className="container w-full px-2 py-8 mx-auto md:px-8">
      {/* Header with search and filters */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              Bioinformatics Tools
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover and use specialized tools for biological sequence
              analysis
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {(activeCategory || searchQuery) && (
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                onClick={resetFilters}
              >
                <FilterX className="w-4 h-4" />
                <span className="sr-only">Reset filters</span>
              </Button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                setActiveCategory(activeCategory === category ? null : category)
              }
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main content with tabs */}
      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="mb-6">
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
              <div className="flex flex-col items-center justify-center col-span-3 py-12 text-center">
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
              <div className="flex flex-col items-center justify-center col-span-3 py-12 text-center">
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
              <div className="flex flex-col items-center justify-center col-span-3 py-12 text-center">
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
              <div className="flex flex-col items-center justify-center col-span-3 py-12 text-center">
                <p className="text-muted-foreground">
                  No favorite tools yet. Mark tools as favorites to see them
                  here.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Popular tools section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Popular Tools</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getPopularTools().map((tool) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced tool card with favorite button and metadata
const ToolCard = ({
  tool,
  onFavoriteToggle,
}: {
  tool: MarketplaceToolInterface;
  onFavoriteToggle: (name: string) => void;
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="relative flex flex-row justify-between pb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold text-foreground">
              {tool.name}
            </CardTitle>
            {tool.new && (
              <Badge className="bg-emerald-500 hover:bg-emerald-500/90">
                New
              </Badge>
            )}
            {tool.trending && (
              <Badge className="bg-amber-500 hover:bg-amber-500/90">
                Trending
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {tool.tags &&
              tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-amber-400"
          onClick={() => onFavoriteToggle(tool.name)}
          title={
            tool.isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          {tool.isFavorited ? (
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          ) : (
            <Star className="w-5 h-5" />
          )}
          <span className="sr-only">Toggle favorite</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="h-16 text-sm text-muted-foreground line-clamp-3">
          {tool.description}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>{tool.favorites} favorites</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Added {tool.dateAdded}</span>
          </div>
        </div>
      </CardContent>{" "}
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="justify-between w-full text-primary hover:text-primary/80"
          onClick={() =>
            (window.location.href = `/protected/tools${tool.frontend_url}`)
          }
        >
          <span>Open Tool</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;
