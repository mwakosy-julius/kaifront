import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GCContentResponse } from "./types/gc-content";
import { GCContentPlot } from "./gcplot";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Dna, BarChart } from "lucide-react";

interface GCContentResultsProps {
  results: GCContentResponse;
}

export function GCContentResults({ results }: GCContentResultsProps) {
  const [activeTab, setActiveTab] = useState("plot");

  const gcContent =
    (
      results.nucleotides.G.percentage + results.nucleotides.C.percentage
    ).toFixed(2) || 0;
  const averageGCContent =
    results.gc_content.reduce((sum, gc) => sum + gc, 0) /
      results.gc_content.length || 0;

  const summaryItems = [
    { label: "Total Length", value: `${results.total_length} bp` },
    { label: "GC Content", value: `${gcContent}%` },
    { label: "Average GC", value: `${averageGCContent.toFixed(2)}%` },
    {
      label: "Max GC",
      value: `${Math.max(...results.gc_content).toFixed(2)}%`,
    },
    {
      label: "Min GC",
      value: `${Math.min(...results.gc_content).toFixed(2)}%`,
    },
  ];

  return (
    <Card className="overflow-hidden rounded !bg-inherit border-none shadow-none">
      <CardContent className="">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-sm">
            <TabsTrigger value="plot" className="flex items-center rounded-sm">
              <BarChart className="w-4 h-4 mr-2" />
              GC Plot
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="flex items-center rounded-sm"
            >
              <Dna className="w-4 h-4 mr-2" />
              Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plot">
            <div className="relative w-full">
              <GCContentPlot
                plotData={results.plot_data}
                windowSize={results.window_size}
                averageGC={averageGCContent}
              />
            </div>
          </TabsContent>

          <TabsContent value="summary">
            {/* Summary Statistics */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">
                Sequence Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {summaryItems.map((item, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden transition-colors border rounded-lg border-border/40 hover:border-border/80"
                  >
                    <DotPattern
                      width={20}
                      height={20}
                      cx={1}
                      cy={1}
                      cr={1}
                      className={cn("absolute inset-0 opacity-10")}
                    />
                    <CardContent className="p-4">
                      <p className="mb-1 text-xs tracking-wider uppercase text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Nucleotide Composition */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">
                Nucleotide Composition
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Object.entries(results.nucleotides).map(
                  ([nucleotide, stats]) => {
                    // Assign colors based on nucleotide
                    const colors = {
                      A: "bg-green-50 border-green-200 text-green-700",
                      T: "bg-red-50 border-red-200 text-red-700",
                      G: "bg-blue-50 border-blue-200 text-blue-700",
                      C: "bg-yellow-50 border-yellow-200 text-yellow-700",
                    };
                    const nucleotideColor =
                      colors[nucleotide as keyof typeof colors] || "";

                    return (
                      <Card
                        key={nucleotide}
                        className="relative overflow-hidden border rounded-lg border-border/40"
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <Badge
                            variant="outline"
                            className={`h-12 w-12 flex justify-center items-center text-xl font-bold ${nucleotideColor}`}
                          >
                            {nucleotide}
                          </Badge>
                          <div className="text-right">
                            <p className="text-2xl font-bold">
                              {stats.percentage.toFixed(2)}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Count: {stats.count.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                        <div
                          className={`h-1 ${nucleotideColor.split(" ")[0]}`}
                          style={{ width: `${stats.percentage}%` }}
                        />
                      </Card>
                    );
                  }
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
