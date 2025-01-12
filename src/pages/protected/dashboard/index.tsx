import { tools } from "@/lib/services/tools";
import { KaiToolsInterface } from "@/lib/services/tools/types";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [toolsData, setToolsData] = useState<KaiToolsInterface[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        await tools().then((res) => setToolsData(res as KaiToolsInterface[]));
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };
    fetchTools();
  }, []);

  return (
    <div className="md:px-8 px-2 py-8 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground">
          Bioinformatics Tools
        </h1>
        <p className="mt-2 text-muted-foreground">
          Access our suite of specialized tools for biological sequence analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: KaiToolsInterface }) => {
  return (
    <Card className={cn(
      "border transition-all duration-200",
      "hover:border-border hover:bg-primary/5 cursor-default"
    )}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4 h-24">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between border-none",
            "hover:bg-primary/10 hover:text-primary",
            "transition-colors duration-200"
          )}
          asChild
        >
          <Link to={'tools' + tool.frontend_url}>
            Open Tool
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;