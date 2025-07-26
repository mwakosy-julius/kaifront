import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Download, Eye, Calendar } from "lucide-react";

const Results = () => {
  const analysisResults = [
    {
      title: "RNA-Seq Differential Expression",
      project: "Cancer Study 2024",
      date: "2024-01-15",
      status: "completed",
      type: "Gene Expression",
      significance: "High",
    },
    {
      title: "Genome-wide Association Study",
      project: "Diabetes Research",
      date: "2024-01-12",
      status: "completed",
      type: "GWAS",
      significance: "Medium",
    },
    {
      title: "Protein Structure Analysis",
      project: "Drug Discovery Pipeline",
      date: "2024-01-10",
      status: "processing",
      type: "Structural",
      significance: "High",
    },
    {
      title: "Phylogenetic Tree Construction",
      project: "Evolution Study",
      date: "2024-01-08",
      status: "completed",
      type: "Phylogenetics",
      significance: "Low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "processing":
        return "bg-yellow-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Results</h1>
          <p className="text-muted-foreground">
            View and manage your analysis results and research findings.
          </p>
        </div>
        <Button>
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Analysis Results</CardTitle>
          <CardDescription>
            Your latest completed and ongoing analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisResults.map((result) => (
              <div
                key={result.title}
                className="flex items-center justify-between p-4 transition-colors border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center mb-2 space-x-3">
                    <h3 className="font-medium">{result.title}</h3>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getSignificanceColor(result.significance)}
                    >
                      {result.significance}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{result.project}</span> •
                    <span className="ml-1">{result.type}</span> •
                    <span className="ml-1">{result.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
