import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { MutationResult } from "@/lib/services/tools/sequence_mutator";
import SequenceViewer from "./SequenceViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Info,
  List,
  Edit2,
  Trash,
  Repeat,
  PlusCircle,
  BarChart3,
  AlignEndVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MutationResultsProps {
  result: MutationResult | null;
}

const MutationResults: React.FC<MutationResultsProps> = ({ result }) => {
  if (!result) {
    return null;
  }

  const downloadFasta = () => {
    const fasta = `>Original\n${result.original_sequence}\n>Mutated\n${result.mutated_sequence}`;
    const blob = new Blob([fasta], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "mutated_sequence.fasta");
  };

  // Count mutation types
  const mutationStats = {
    substitutions: result.mutations.filter((m) => m.from && m.to).length,
    insertions: result.mutations.filter((m) => m.inserted).length,
    deletions: result.mutations.filter((m) => m.deleted).length,
  };

  // Calculate percentages for statistics
  const totalMutations = result.mutation_count;
  const getMutationPercentage = (count: number) =>
    totalMutations > 0 ? Math.round((count / totalMutations) * 100) : 0;

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden bg-white">
        <CardHeader className="pb-4 bg-muted/40">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">
                Sequence Mutation Results
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {result.original_sequence.length} bp sequence with{" "}
                {totalMutations} mutations
              </CardDescription>
            </div>
            <Badge className="transition-colors bg-primary/10 text-primary hover:bg-primary/20">
              {totalMutations} mutations
            </Badge>
          </div>
        </CardHeader>

        <Tabs defaultValue="comparison" className="w-full">
          <div className="px-6 border-b border-border/40">
            <TabsList className="justify-start w-full h-12 gap-2 p-0 bg-transparent">
              <TabsTrigger
                value="comparison"
                className="data-[state=active]:bg-background/80 rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 pt-3"
              >
                <AlignEndVertical className="w-4 h-4 mr-2" />
                Sequence Comparison
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="data-[state=active]:bg-background/80 rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 pt-3"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Statistics
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-background/80 rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-3 pt-3"
              >
                <List className="w-4 h-4 mr-2" />
                Mutation Details
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="p-6 m-0 space-y-6">
            <SequenceViewer
              sequence={result.mutated_sequence}
              originalSequence={result.original_sequence}
              title="Original vs Mutated Sequence"
              sequenceStyle={{ backgroundColor: "transparent" }}
              basesPerLine={50}
              showComparison={true}
            />
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="p-6 m-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MutationTypeCard
                title="Substitutions"
                count={mutationStats.substitutions}
                percentage={getMutationPercentage(mutationStats.substitutions)}
                icon={<Repeat className="w-5 h-5 text-blue-400" />}
                color="blue"
              />
              <MutationTypeCard
                title="Insertions"
                count={mutationStats.insertions}
                percentage={getMutationPercentage(mutationStats.insertions)}
                icon={<PlusCircle className="w-5 h-5 text-emerald-400" />}
                color="emerald"
              />
              <MutationTypeCard
                title="Deletions"
                count={mutationStats.deletions}
                percentage={getMutationPercentage(mutationStats.deletions)}
                icon={<Trash className="w-5 h-5 text-rose-400" />}
                color="rose"
              />
            </div>

            <Separator className="my-6 bg-border/40" />

            <div className="overflow-hidden border rounded-lg border-border/40">
              <div className="flex items-center px-4 py-3 bg-muted/20">
                <Info className="w-4 h-4 mr-2 text-primary" />
                <h3 className="text-sm font-medium">Mutation Visualization</h3>
              </div>
              <div className="p-4 bg-card/30">
                <SequenceViewer
                  sequence={result.mutated_sequence}
                  originalSequence={result.original_sequence}
                  title="Sequence with Mutations"
                  sequenceStyle={{ backgroundColor: "transparent" }}
                  basesPerLine={60}
                />
              </div>
            </div>
          </TabsContent>

          {/* Mutation Details Tab */}
          <TabsContent value="details" className="p-6 m-0 space-y-6">
            {result.mutations.length > 0 ? (
              <div className="overflow-hidden border rounded-lg border-border/40">
                <div className="flex items-center px-4 py-3 bg-muted/20">
                  <Edit2 className="w-4 h-4 mr-2 text-primary" />
                  <h3 className="text-sm font-medium">Mutation List</h3>
                </div>
                <div className="p-4 bg-card/30">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {result.mutations.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center p-3 border rounded-md bg-background/60 border-border/40"
                      >
                        <div className="mr-3">
                          {m.from && m.to ? (
                            <div className="p-1.5 rounded-full bg-blue-500/10">
                              <Repeat className="w-4 h-4 text-blue-500" />
                            </div>
                          ) : m.inserted ? (
                            <div className="p-1.5 rounded-full bg-emerald-500/10">
                              <PlusCircle className="w-4 h-4 text-emerald-500" />
                            </div>
                          ) : (
                            <div className="p-1.5 rounded-full bg-rose-500/10">
                              <Trash className="w-4 h-4 text-rose-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">
                            Position {m.position}
                          </div>
                          <div className="mt-1 font-mono text-sm">
                            {m.from && m.to ? (
                              <>
                                <span className="text-rose-400">{m.from}</span>{" "}
                                <span className="text-muted-foreground">→</span>{" "}
                                <span className="text-emerald-400">{m.to}</span>
                              </>
                            ) : m.inserted ? (
                              <>
                                <span className="text-muted-foreground">-</span>{" "}
                                <span className="text-muted-foreground">→</span>{" "}
                                <span className="text-emerald-400">
                                  {m.inserted}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-rose-400">
                                  {m.deleted}
                                </span>{" "}
                                <span className="text-muted-foreground">→</span>{" "}
                                <span className="text-muted-foreground">-</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <Info className="w-12 h-12 mb-4 text-muted-foreground opacity-40" />
                <h3 className="mb-2 text-lg font-medium">No Mutations Found</h3>
                <p className="max-w-md text-muted-foreground">
                  There are no mutations to display. Try adjusting your mutation
                  parameters to generate sequence changes.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <CardFooter className="flex-col gap-3 p-6 pt-2 sm:flex-row sm:gap-2 bg-muted/10">
          <div className="flex w-full gap-2">
            <Button
              onClick={downloadFasta}
              className="flex-1 sm:flex-none"
              variant="default"
            >
              <Download className="w-4 h-4 mr-2" />
              Download FASTA
            </Button>

            <Button
              onClick={() => {
                const csv = `Position,From,To\n${result.mutations
                  .map(
                    (m) =>
                      `${m.position},${m.from || m.deleted || ""},${
                        m.to || m.inserted || ""
                      }`
                  )
                  .join("\n")}`;
                const blob = new Blob([csv], {
                  type: "text/csv;charset=utf-8",
                });
                saveAs(blob, "mutations.csv");
              }}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Helper component for mutation type cards
const MutationTypeCard = ({
  title,
  count,
  percentage,
  icon,
  color,
}: {
  title: string;
  count: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string; fill: string }
    > = {
      blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-500",
        border: "border-blue-500/20",
        fill: "bg-blue-500",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-500",
        border: "border-emerald-500/20",
        fill: "bg-emerald-500",
      },
      rose: {
        bg: "bg-rose-500/10",
        text: "text-rose-500",
        border: "border-rose-500/20",
        fill: "bg-rose-500",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColorClasses(color);

  return (
    <div
      className={`rounded-lg p-4 border ${colors.border} ${colors.bg} backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{count}</p>
        </div>
        <div className={`p-2 rounded-full ${colors.bg}`}>{icon}</div>
      </div>
      <div className="pt-3 mt-3 border-t border-border/30">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Percentage</span>
          <span className={`text-xs font-medium ${colors.text}`}>
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-background/60 h-1.5 rounded-full mt-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full ${colors.fill}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MutationResults;
