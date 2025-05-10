import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  GitBranch,
  Share2,
  BookOpen,
  // Info,
  Activity,
  Clock,
  Network,
} from "lucide-react";
import {
  generatePhylogeneticTree,
  PhylogeneticTreeResponse,
} from "@/lib/services/tools/phylogenetic_tree";
import SequenceInput from "./components/SequenceInput";
import TreeVisualization from "./components/TreeVisualization";
import DownloadButtons from "./components/DownloadButtons";

const PhylogeneticTree: React.FC = () => {
  const [sequences, setSequences] = useState("");
  const [treeData, setTreeData] = useState<PhylogeneticTreeResponse | null>(
    null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      label: "Algorithm",
      value: "Neighbor-Joining",
      icon: Network,
    },
    {
      label: "Complexity",
      value: "O(n²)",
      icon: Activity,
    },
    {
      label: "Processing Time",
      value: "~5-30 seconds",
      icon: Clock,
    },
  ];

  const handleGenerateTree = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await generatePhylogeneticTree(sequences);
      setTreeData(data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(axiosError.response?.data?.detail || "Failed to generate tree");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                <GitBranch className="w-8 h-8" />
                PhyloViz
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Generate interactive phylogenetic trees from DNA or protein
                sequences
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Documentation
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share Results
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tool Statistics */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded bg-muted/50">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="p-3 rounded bg-primary/10">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <SequenceInput
            sequences={sequences}
            setSequences={setSequences}
            onSubmit={handleGenerateTree}
            loading={loading}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        {/* <CardFooter className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <div className="space-y-1">
              <p>
                This tool builds phylogenetic trees using the Neighbor-Joining
                method to show evolutionary relationships between sequences.
                Upload multiple sequences in FASTA format for analysis.
              </p>
              <p>
                Trees can be exported in SVG, PNG, and Newick formats for use in
                presentations or further analysis.
              </p>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {treeData && (
        <div className="mt-6 space-y-6">
          <TreeVisualization svg={treeData.svg} newick={treeData.newick} />
          {/* <Card>
            <CardHeader>
              <CardTitle>Newick Format</CardTitle>
              <CardDescription>
                Standard representation of the phylogenetic tree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 overflow-x-auto font-mono text-sm border rounded bg-muted/50">
                {treeData.newick}
              </pre>
            </CardContent>
          </Card> */}
          <DownloadButtons treeData={treeData} />
        </div>
      )}
    </div>
  );
};

export default PhylogeneticTree;
