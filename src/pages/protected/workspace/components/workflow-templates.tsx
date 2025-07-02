"use client";
import { BarChart3, Dna, Microscope, TrendingUp, Zap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    title: "RNA-Seq Analysis",
    description:
      "Complete RNA sequencing analysis workflow with differential expression",
    icon: Dna,
    runs: 1247,
    category: "Genomics",
  },
  {
    title: "Proteomics Discovery",
    description: "Mass spectrometry data processing and protein identification",
    icon: Microscope,
    runs: 892,
    category: "Proteomics",
  },
  {
    title: "Statistical Modeling",
    description:
      "Advanced statistical analysis with machine learning integration",
    icon: TrendingUp,
    runs: 634,
    category: "Statistics",
  },
  {
    title: "Metabolomics Profiling",
    description: "Metabolite identification and pathway analysis workflow",
    icon: BarChart3,
    runs: 445,
    category: "Metabolomics",
  },
  {
    title: "Multi-Omics Integration",
    description: "Integrate genomics, proteomics, and metabolomics data",
    icon: Zap,
    runs: 278,
    category: "Integration",
  },
];

interface WorkflowTemplatesProps {
  onTemplateSelect?: (template: string) => void;
}

export function WorkflowTemplates({
  onTemplateSelect,
}: WorkflowTemplatesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card
          key={template.title}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onTemplateSelect?.(template.title)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <template.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {template.category}
              </Badge>
            </div>
            <CardTitle className="text-lg">{template.title}</CardTitle>
            <CardDescription className="text-sm">
              {template.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>🔗 {template.runs} runs</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
