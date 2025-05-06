import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenterVertical,
  Table as TableIcon,
  BarChart,
} from "lucide-react";

// local imports
import { AlignmentResultsProps } from "./types/alignment";
import { SequenceTable } from "./components/sequence-table";
import { SequenceChart } from "./components/sequence-chart";

export const AlignmentResults: React.FC<AlignmentResultsProps> = ({
  results,
}) => {
  return (
    <div className="mt-4 border-t px-[22px] py-5 !bg-inherit">
      <h2 className="mb-6 text-3xl font-semibold">
        Pairwise Alignment Results
      </h2>

      <Tabs defaultValue="alignment" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 rounded-none h-14 bg-card/5">
          <TabsTrigger
            value="alignment"
            className="gap-2 h-12 !shadow-none focus:!bg-secondary rounded-none border"
          >
            <AlignCenterVertical className="w-4 h-4" />
            Alignment
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="gap-2 h-12 !shadow-none focus:!bg-secondary rounded-none border"
          >
            <TableIcon className="w-4 h-4" />
            Table
          </TabsTrigger>
          <TabsTrigger
            value="chart"
            className="gap-2 h-12 !shadow-none focus:!bg-secondary rounded-none border"
          >
            <BarChart className="w-4 h-4" />
            Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alignment" className="mt-6 space-y-4">
          <div className="!bg-background p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 rounded-md bg-secondary/20">
                  <h3 className="mb-3 text-sm font-semibold text-primary">
                    Alignment Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <p className="text-muted-foreground">Match Score:</p>
                    <p className="font-medium">{results.results.match_score}</p>
                    <p className="text-muted-foreground">Mismatch:</p>
                    <p className="font-medium">{results.results.gap_open}</p>
                    <p className="text-muted-foreground">Gap Extend:</p>
                    <p className="font-medium">{results.results.gap_extend}</p>
                    <p className="text-muted-foreground">Alignment Score:</p>
                    <p className="font-medium text-primary">
                      {results.results.alignment_score}
                    </p>
                    <p className="text-muted-foreground">Similarity:</p>
                    <p className="font-medium text-primary">
                      {results.results.similarity}%
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-md bg-secondary/20">
                  <h3 className="mb-3 text-sm font-semibold text-primary">
                    Alignment Type
                  </h3>
                  <p className="font-medium capitalize">
                    {results.alignment_type.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary">
                  Aligned Sequences
                </h3>
                <div className="p-4 space-y-4 font-mono border rounded-md bg-background border-border/50">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-primary/10 text-primary">
                        Sequence 1
                      </span>
                    </div>
                    <p className="p-2 overflow-x-auto text-sm tracking-wide break-all rounded bg-muted/30">
                      {results.results.sequence1_aligned}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-primary/10 text-primary">
                        Sequence 2
                      </span>
                    </div>
                    <p className="p-2 overflow-x-auto text-sm tracking-wide break-all rounded bg-muted/30">
                      {results.results.sequence2_aligned}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <div className="!bg-background rounded-lg">
            <SequenceTable
              sequence1={results.results.sequence1_aligned}
              sequence2={results.results.sequence2_aligned}
            />
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-6">
          <div className="!bg-background rounded-lg">
            <SequenceChart
              sequence1={results.results.sequence1_aligned}
              sequence2={results.results.sequence2_aligned}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
