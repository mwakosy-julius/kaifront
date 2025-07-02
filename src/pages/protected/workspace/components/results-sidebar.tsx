"use client";

import type * as React from "react";
import { X, FileText, BarChart3, List, StickyNote } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultsSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onClose?: () => void;
}

export function ResultsSidebar({ onClose, ...props }: ResultsSidebarProps) {
  return (
    <Sidebar side="right" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2">
          <h3 className="font-semibold">Kaidoku Results</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="px-2 text-xs text-muted-foreground">
          Analysis results and workflow outputs will appear here as you process
          data.
        </p>
      </SidebarHeader>

      <SidebarContent>
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mx-2">
            <TabsTrigger value="analysis" className="text-xs">
              <BarChart3 className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="data" className="text-xs">
              <FileText className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="outline" className="text-xs">
              <List className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs">
              <StickyNote className="h-3 w-3" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="px-2">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <h4 className="font-medium text-sm">Statistical Analysis</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Completed analysis of 9 samples with significance testing
                  </p>
                  <div className="mt-2 text-xs">
                    <div>P-value: 0.0023</div>
                    <div>Effect size: 0.67</div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <h4 className="font-medium text-sm">Quality Control</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    All samples passed QC thresholds
                  </p>
                  <div className="mt-2 text-xs">
                    <div>Pass rate: 100%</div>
                    <div>Avg quality: 98.2</div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="data" className="px-2">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                <div className="text-xs font-medium">Generated Files</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 p-2 rounded border text-xs">
                    <FileText className="h-3 w-3" />
                    <span>analysis_results.csv</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded border text-xs">
                    <FileText className="h-3 w-3" />
                    <span>quality_report.pdf</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded border text-xs">
                    <FileText className="h-3 w-3" />
                    <span>processed_data.json</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="outline" className="px-2">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 text-xs">
                <div className="font-medium">Workflow Outline</div>
                <div className="space-y-1 pl-2">
                  <div>1. Data Import</div>
                  <div>2. Quality Control</div>
                  <div>3. Statistical Analysis</div>
                  <div>4. Visualization</div>
                  <div>5. Report Generation</div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="notes" className="px-2">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 text-xs">
                <div className="font-medium">Analysis Notes</div>
                <div className="space-y-2">
                  <div className="p-2 rounded border">
                    <div className="font-medium">Sample Quality</div>
                    <div className="text-muted-foreground">
                      All samples show high quality scores above 95%
                    </div>
                  </div>
                  <div className="p-2 rounded border">
                    <div className="font-medium">Statistical Significance</div>
                    <div className="text-muted-foreground">
                      Strong evidence for treatment effect (p {"<"} 0.01)
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
