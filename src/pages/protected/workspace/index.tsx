"use client";

import * as React from "react";
import { MessageCircle, Settings, MoreHorizontal, Plus } from "lucide-react";

import { AppSidebar } from "./components/app-sidebar";
import { ResultsSidebar } from "./components/results-sidebar";
import { WorkflowTemplates } from "./components/workflow-templates";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

type ViewState = "default" | "results";

export default function KaidokuWorkspace() {
  const [viewState, setViewState] = React.useState<ViewState>("default");
  const [showResultsSidebar, setShowResultsSidebar] = React.useState(false);
  const [chatInput, setChatInput] = React.useState("");

  const handleNewWorkflow = () => {
    setViewState("default");
    setShowResultsSidebar(false);
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setShowResultsSidebar(true);
      setChatInput("");
    }
  };

  const handleTemplateSelect = (template: string) => {
    setShowResultsSidebar(true);
  };

  const renderMainContent = () => {
    switch (viewState) {
      case "results":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        );

      default:
        return (
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">
                  What do you want to analyze today?
                </h1>

                <div className="flex items-center gap-2 p-4 border rounded-lg bg-background">
                  <Button variant="ghost" size="sm" className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Connect data and start analyzing!"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
                    className="border-0 shadow-none focus-visible:ring-0"
                  />
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">K Default</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          🔧 Tools
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Advanced Analysis</DropdownMenuItem>
                        <DropdownMenuItem>Extended Memory</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Or start from ready workflows
                  </h2>
                  <div className="relative">
                    <Input placeholder="Search workflows..." className="w-64" />
                  </div>
                </div>

                <WorkflowTemplates onTemplateSelect={handleTemplateSelect} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onNewWorkflow={handleNewWorkflow} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              ● Connected
            </Badge>
            <Button variant="ghost" size="sm">
              🔄
            </Button>
            <Button variant="ghost" size="sm">
              🔗
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export Results</DropdownMenuItem>
                <DropdownMenuItem>Share Workflow</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {renderMainContent()}
      </SidebarInset>

      {showResultsSidebar && (
        <ResultsSidebar onClose={() => setShowResultsSidebar(false)} />
      )}
    </SidebarProvider>
  );
}
