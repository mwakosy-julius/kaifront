import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

// local imports
import { tools } from "@/lib/services/tools";
import { Button } from "@/components/ui/button";
import { KaiToolsInterface } from "@/lib/services/tools/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Dashboard = () => {
  const [toolsData, setToolsData] = useState<KaiToolsInterface[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        await tools().then((res) => setToolsData(res as KaiToolsInterface[]));
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };
    fetchTools();
  }, []);

  return (
    <div className="w-full max-w-6xl px-2 py-8 mx-auto md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground">
          Bioinformatics Tools
        </h1>
        <p className="mt-2 text-muted-foreground">
          Access our suite of specialized tools for biological sequence analysis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {toolsData.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: KaiToolsInterface }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {tool.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="h-24 text-sm text-muted-foreground line-clamp-4">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          href={"tools" + tool.frontend_url}
          className="justify-between w-full"
          asChild
        >
          Open Tool
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;