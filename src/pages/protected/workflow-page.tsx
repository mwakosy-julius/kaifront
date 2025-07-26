import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Play, Clock, CheckCircle } from "lucide-react";

const Workflows = () => {
  const workflows = [
    {
      title: "RNA-Seq Analysis",
      description: "Complete pipeline for RNA sequencing data analysis",
      status: "active",
      duration: "2-4 hours",
      steps: 8,
    },
    {
      title: "Genome Assembly",
      description: "De novo genome assembly workflow",
      status: "draft",
      duration: "6-12 hours",
      steps: 12,
    },
    {
      title: "Variant Calling",
      description: "Identify genetic variants from sequencing data",
      status: "completed",
      duration: "1-3 hours",
      steps: 6,
    },
    {
      title: "Protein Structure Prediction",
      description: "Predict protein structures using AlphaFold",
      status: "active",
      duration: "30 minutes",
      steps: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-green-500 text-white";
      case "draft":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      case "draft":
        return <GitBranch className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
          <p className="text-muted-foreground">
            Automated bioinformatics pipelines and analysis workflows.
          </p>
        </div>
        <Button>
          <GitBranch className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {workflows.map((workflow) => (
          <Card
            key={workflow.title}
            className="transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{workflow.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {workflow.description}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(workflow.status)}>
                  {getStatusIcon(workflow.status)}
                  <span className="ml-1 capitalize">{workflow.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span>{workflow.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Steps:</span>
                <span>{workflow.steps}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  <Play className="w-3 h-3 mr-1" />
                  Run
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workflows;
