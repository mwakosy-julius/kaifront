import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface ToolNavigationProps {
  currentToolId: string;
  toolCategory?: string;
}

// Tool categories and their tools
const TOOL_CATEGORIES = [
  {
    id: "sequence-analysis",
    name: "Sequence Analysis",
    description: "Analyze and manipulate DNA/RNA sequences with precision",
    tools: [
      {
        id: "blast",
        name: "BLAST",
        description:
          "Search sequence databases for optimal local alignment matches",
        relatedTools: [
          "pairwise_alignment",
          "sequence_search",
          "multiple_alignment",
        ],
      },
      {
        id: "sequence_search",
        name: "Sequence Search",
        description: "Find patterns and motifs within nucleotide sequences",
        relatedTools: ["motif_finder", "blast", "dna_visualization"],
      },
      {
        id: "consensus_maker",
        name: "Consensus Maker",
        description: "Generate consensus sequences from multiple alignments",
        relatedTools: [
          "multiple_alignment",
          "sequence_search",
          "phylogenetic_tree",
        ],
      },
      {
        id: "sequence_mutator",
        name: "Sequence Mutator",
        description:
          "Simulate mutations and analyze their effects on sequences",
        relatedTools: ["variant_calling", "dna_visualization", "gc_content"],
      },
    ],
  },
  {
    id: "genomics",
    name: "Genomics",
    description: "Advanced tools for whole genome analysis and interpretation",
    tools: [
      {
        id: "gc_content",
        name: "GC Content",
        description: "Calculate and visualize GC content across sequences",
        relatedTools: ["codon_usage", "dna_visualization", "sequence_search"],
      },
      {
        id: "codon_usage",
        name: "Codon Usage",
        description:
          "Analyze codon frequency and optimization in coding sequences",
        relatedTools: ["gc_content", "sequence_mutator", "sequence_search"],
      },
      {
        id: "data_compression",
        name: "Data Compression",
        description:
          "Efficiently compress genomic data for storage and transfer",
        relatedTools: ["gc_content", "variant_calling"],
      },
      {
        id: "variant_calling",
        name: "Variant Calling",
        description: "Identify genomic variants from sequencing data",
        relatedTools: [
          "sequence_mutator",
          "multiple_alignment",
          "dna_visualization",
        ],
      },
    ],
  },
  {
    id: "comparative",
    name: "Comparative Genomics",
    description: "Compare sequences across species and evolutionary analyses",
    tools: [
      {
        id: "phylogenetic_tree",
        name: "Phylogenetic Trees",
        description: "Generate evolutionary trees from multiple sequences",
        relatedTools: ["multiple_alignment", "consensus_maker", "metagenomics"],
      },
      {
        id: "multiple_alignment",
        name: "Multiple Alignment",
        description:
          "Align multiple sequences to identify conservation patterns",
        relatedTools: [
          "pairwise_alignment",
          "phylogenetic_tree",
          "consensus_maker",
        ],
      },
      {
        id: "metagenomics",
        name: "Metagenomics",
        description: "Analyze microbial communities from environmental samples",
        relatedTools: ["phylogenetic_tree", "multiple_alignment", "gc_content"],
      },
      {
        id: "pairwise_alignment",
        name: "Pairwise Alignment",
        description:
          "Compare two sequences to identify similarities and differences",
        relatedTools: ["multiple_alignment", "blast", "sequence_search"],
      },
    ],
  },
  {
    id: "visualization",
    name: "Visualization",
    description: "Powerful visual representations of complex biological data",
    tools: [
      {
        id: "dna_visualization",
        name: "DNA Visualization",
        description:
          "Interactive visualization of nucleotide sequences and features",
        relatedTools: ["sequence_search", "gc_content", "motif_finder"],
      },
      {
        id: "protein_structure",
        name: "Protein Structure",
        description: "Visualize and analyze 3D protein structures",
        relatedTools: ["blast", "multiple_alignment", "motif_finder"],
      },
      {
        id: "motif_finder",
        name: "Motif Finder",
        description: "Identify and visualize sequence motifs and patterns",
        relatedTools: [
          "sequence_search",
          "dna_visualization",
          "multiple_alignment",
        ],
      },
    ],
  },
];

// Get all tools in a flat array
const getAllTools = () => {
  return TOOL_CATEGORIES.flatMap((category) =>
    category.tools.map((tool) => ({
      ...tool,
      category: {
        id: category.id,
        name: category.name,
      },
    }))
  );
};

export const ToolNavigation: React.FC<ToolNavigationProps> = ({
  currentToolId,
}) => {
  // Find the current tool and its category
  const allTools = getAllTools();
  const currentTool = allTools.find((tool) => tool.id === currentToolId);

  if (!currentTool) return null;

  // Get directly related tools based on the tool's relatedTools array
  const relatedTools = currentTool.relatedTools
    .map((id) => allTools.find((tool) => tool.id === id))
    .filter((tool): tool is (typeof allTools)[0] => tool !== undefined);

  // Group related tools by category
  const relatedByCategory = relatedTools.reduce((acc, tool) => {
    const category = tool.category.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, typeof relatedTools>);

  // Get tools in the same category (excluding current and already shown related tools)
  const sameCategory = allTools.filter(
    (tool) =>
      tool.category.id === currentTool.category.id &&
      tool.id !== currentToolId &&
      !currentTool.relatedTools.includes(tool.id)
  );

  return (
    <div className="mt-8 space-y-6">
      {/* Breadcrumb navigation */}
      {/* <CategoryBreadcrumb
        category={currentTool.category}
        currentToolName={currentTool.name}
      /> */}

      {/* Related tools grouped by functionality */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Related Tools</CardTitle>
          <CardDescription>
            Tools that work well with {currentTool.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(relatedByCategory).map(([category, tools]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                  {category}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/protected/tools/${tool.id}`}
                      className={cn(
                        "relative p-4 group rounded-lg",
                        "transition-colors duration-200",
                        "hover:bg-muted"
                      )}
                    >
                      <h4 className="font-medium text-primary">{tool.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                      <ArrowRight className="absolute w-4 h-4 transition-transform duration-200 opacity-0 right-4 top-4 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* More tools from the same category */}
      {sameCategory.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              More {currentTool.category.name} Tools
            </CardTitle>
            <CardDescription>
              Other tools in this category that might help your analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sameCategory.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/protected/tools/${tool.id}`}
                  className={cn(
                    "relative p-4 group rounded-lg",
                    "transition-colors duration-200",
                    "hover:bg-muted"
                  )}
                >
                  <h3 className="font-medium text-primary">{tool.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <ArrowRight className="absolute w-4 h-4 transition-transform duration-200 opacity-0 right-4 top-4 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
