import React from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ToolPlaylistProps {
  title: string;
  description: string;
  image: string;
  category: "genomics" | "proteomics" | "metabolomics" | string;
  route: string;
}

export const ToolPlaylistCard: React.FC<ToolPlaylistProps> = ({
  title,
  description,
  image,
  category,
  route,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Map category to color class
  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "genomics":
        return isDark ? "bg-genomics-dark" : "bg-genomics";
      case "proteomics":
        return isDark ? "bg-proteomics-dark" : "bg-proteomics";
      case "metabolomics":
        return isDark ? "bg-metabolomics-dark" : "bg-metabolomics";
      default:
        return "bg-primary";
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden group cursor-pointer transition-all duration-300",
        "hover:shadow-tool-card dark:hover:shadow-tool-card-dark border-0",
        "h-60" // Fixed height for consistency
      )}
      onClick={() => navigate(route)}
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-gray-200">{description}</p>
          </div>
          <span className="p-2 transition-colors rounded-full bg-white/20 group-hover:bg-white/30">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div
        className={cn(
          "absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded text-white",
          getCategoryColorClass(category)
        )}
      >
        {category}
      </div>
    </Card>
  );
};

interface ToolPlaylistsProps {
  playlists: ToolPlaylistProps[];
}

export const ToolPlaylists: React.FC<ToolPlaylistsProps> = ({ playlists }) => {
  return (
    <div className="mb-12 ">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {playlists.map((playlist, index) => (
          <ToolPlaylistCard key={index} {...playlist} />
        ))}
      </div>
    </div>
  );
};
