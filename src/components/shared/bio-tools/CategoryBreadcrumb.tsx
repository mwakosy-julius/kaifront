import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryBreadcrumbProps {
  category: {
    id: string;
    name: string;
  };
  currentToolName: string;
}

export const CategoryBreadcrumb: React.FC<CategoryBreadcrumbProps> = ({
  category,
  currentToolName,
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <Link
        to="/protected/tools"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link
        to={`/protected/tools?category=${category.id}`}
        className={cn("hover:text-foreground transition-colors")}
      >
        {category.name}
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium">{currentToolName}</span>
    </div>
  );
};
