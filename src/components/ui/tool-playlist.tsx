import React from "react";
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

export const ToolPlaylistCard: React.FC<
  ToolPlaylistProps & { featured?: boolean; index?: number }
> = ({
  title,
  description,
  image,
  category,
  route,
  featured = false,
  index = 0,
}) => {
  const navigate = useNavigate();

  // Map category to color class
  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "genomics":
        return "bg-cyan-500";
      case "proteomics":
        return "bg-blue-500";
      case "metabolomics":
        return "bg-emerald-500";
      default:
        return "bg-cyan-500";
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden group cursor-pointer transition-all duration-300",
        "border-0 rounded-xl",
        "h-[220px]", // Fixed height based on the image
        featured && index === 0 && "md:col-span-2 md:row-span-2 md:h-[460px]"
      )}
      onClick={() => navigate(route)}
      style={{
        background: "linear-gradient(to bottom, #1a1a1a, #0a0a0a)",
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={cn(
                "font-bold text-white",
                featured && index === 0 ? "text-2xl mb-2" : "text-lg"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-gray-300",
                featured && index === 0 ? "text-base" : "text-sm line-clamp-2"
              )}
            >
              {description}
            </p>

            {featured && index === 0 && (
              <div className="flex items-center mt-4 transition-colors text-cyan-400 group-hover:text-cyan-300">
                <span className="text-sm font-medium">Open Collection</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            )}
          </div>

          {!(featured && index === 0) && (
            <span className="p-2 text-white transition-colors rounded-full bg-white/10 group-hover:bg-white/20">
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "absolute top-4 left-4 px-2 py-1 text-xs font-medium rounded text-white",
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
  featured?: boolean;
}

export const ToolPlaylists: React.FC<ToolPlaylistsProps> = ({
  playlists,
  featured = false,
}) => {
  return (
    <div>
      {featured ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {playlists.map((playlist, index) => (
            <ToolPlaylistCard
              key={index}
              {...playlist}
              featured={true}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {playlists.map((playlist, index) => (
            <ToolPlaylistCard key={index} {...playlist} />
          ))}
        </div>
      )}
    </div>
  );
};
