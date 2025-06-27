import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";

// new imports
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Heart,
  Library,
  GitBranch,
  Download,
  Share,
  Zap,
  Users,
  PlusCircle,
  Plus,
  Folder,
} from "lucide-react";

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

export const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();

  // const navItems = [{ icon: Settings, label: "Settings", path: "/settings" }];

  // return (
  //   <aside
  //     className={cn(
  //       "h-full",
  //       "border-border",
  //       "transition-all duration-300 ease-in-out",
  //       isExpanded ? "-translate-x-16 w-0" : ""
  //     )}
  //   >
  //     <div className="relative flex items-center">
  //       <Link
  //         to="/dashboard"
  //         className={cn(
  //           "h-[65px] w-[60px]",
  //           "relative flex items-center bg-background justify-center",
  //           "transition-opacity duration-300",
  //           isExpanded ? "opacity-0" : "opacity-100"
  //         )}
  //       >
  //         <img
  //           src={DashboardLogo}
  //           alt="Logo"
  //           className={cn(
  //             "absolute w-12 h-12 object-contain",
  //             "transition-opacity duration-200",
  //             isExpanded ? "opacity-0" : "opacity-100"
  //           )}
  //         />
  //       </Link>

  //       <Button
  //         variant="ghost"
  //         size="icon"
  //         onClick={toggleSidebar}
  //         className={cn(
  //           // "ml-auto md:hidden absolute",
  //           // "hover:bg-primary/5",
  //           "transition-all duration-200",
  //           isExpanded ? "-right-[100px]" : "-right-[36px]"
  //         )}
  //       >
  //         {!isExpanded ? (
  //           <ChevronLeft className="w-6 h-6 text-primary" />
  //         ) : (
  //           <ChevronRight className="w-6 h-6 text-primary" />
  //         )}
  //       </Button>
  //     </div>

  //     <nav className="flex flex-col items-center w-full py-1 overflow-hidden">
  //       {navItems.map((item) => (
  //         <Link
  //           key={item.path}
  //           to={item.path}
  //           className={cn(
  //             "h-[70px] w-[60px] justify-center",
  //             "hover:bg-primary/5",
  //             "transition-all duration-200",
  //             "flex items-center",
  //             isExpanded ? "gap-3" : ""
  //           )}
  //         >
  //           <item.icon
  //             className={cn(
  //               "w-8 h-8",
  //               "text-muted-foreground",
  //               "transition-colors duration-200",
  //               "group-hover:text-primary"
  //             )}
  //           />
  //           <span className="sr-only">{item.label}</span>
  //         </Link>
  //       ))}
  //     </nav>
  //   </aside>
  // );
  //
  return (
    <div className="relative h-full">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-4 z-10 w-6 h-6 bg-background border border-border rounded-full",
          "hover:bg-accent transition-all duration-200",
        )}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </Button>

      {/* Left Sidebar */}
      <div
        className={cn(
          "bg-card border border-border rounded-lg flex flex-col transition-all duration-300 hover:border-border/80 hover:bg-card/95",
          isExpanded ? "w-60" : "w-16",
        )}
      >
        {/* Library Header */}
        <div className="p-4">
          <div
            className={cn(
              "flex items-center mb-3 transition-all duration-300",
              isExpanded ? "justify-between" : "justify-center",
            )}
          >
            <div
              className={cn(
                "flex items-center transition-all duration-300",
                isExpanded ? "space-x-2" : "justify-center",
              )}
            >
              <Library className="w-4 h-4 flex-shrink-0" />
              {isExpanded && (
                <h2 className="font-medium text-sm">Your Library</h2>
              )}
            </div>
            {isExpanded && (
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <PlusCircle className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Library Content */}
        <ScrollArea className="flex-1">
          {/* Collections */}
          <div
            className={cn("pb-4", {
              "px-4": isExpanded,
            })}
          >
            {isExpanded && (
              <h3 className="text-xs font-medium text-muted-foreground mb-2">
                COLLECTIONS
              </h3>
            )}
            <div className="space-y-1">
              {mockCollections.map((collection) => (
                <div
                  key={collection.id}
                  className={cn(
                    "flex items-center p-2 rounded-md hover:bg-accent transition-all duration-200 cursor-pointer group hover:shadow-sm",
                    isExpanded ? "space-x-2" : "justify-center",
                  )}
                  title={!isExpanded ? collection.name : undefined}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  {isExpanded && (
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {collection.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {collection.tools} tools
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className={isExpanded ? "mx-3" : ""} />

          {/* Recent Activity - Minimized */}
          <div className="p-4">
            {isExpanded && (
              <h3 className="text-xs font-medium text-muted-foreground mb-2">
                RECENT ACTIVITY
              </h3>
            )}
            <div className="space-y-2">
              {mockActivity.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-center p-1 rounded-md hover:bg-accent/50 transition-all duration-200 cursor-pointer",
                    isExpanded ? "space-x-2" : "justify-center",
                  )}
                  title={!isExpanded ? activity.action : undefined}
                >
                  <Avatar className="w-5 h-5 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      {activity.type === "tool_usage" ? (
                        <Zap className="w-4 h-4" />
                      ) : activity.type === "favorite" ? (
                        <Heart className="w-4 h-4" />
                      ) : activity.type === "project" ? (
                        <GitBranch className="w-4 h-4" />
                      ) : activity.type === "share" ? (
                        <Share className="w-4 h-4" />
                      ) : activity.type === "download" ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <Users className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {isExpanded && (
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export const RightSidebar = () => {
  return (
    // {/* Right Sidebar - Minimized Projects */}
    <div className="w-60 bg-card border border-border rounded-lg flex flex-col transition-all duration-300 hover:border-border/80 hover:bg-card/95">
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

          <Button variant="outline" className="w-full mt-3" size="sm">
            <Folder className="w-3 h-3 mr-1" />
            View all
          </Button>

          <Button className="w-full mt-2" size="sm">
            <Plus className="w-3 h-3 mr-1" />
            New project
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
