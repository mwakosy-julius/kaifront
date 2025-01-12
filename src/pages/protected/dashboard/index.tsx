import { tools } from "@/lib/services/tools";
import { KaiToolsInterface } from "@/lib/services/tools/types";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
        <h1 className="text-3xl font-semibold text-neutral-900">Bioinformatics Tools</h1>
        <p className="mt-2 text-neutral-600">Access our suite of specialized tools for biological sequence analysis</p>
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
    <Card className="border shadow-none border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          {tool.name}
        </CardTitle>
        <CardDescription className="mt-2 text-sm text-neutral-600 line-clamp-2">
          {tool.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-24">
        <p className="text-sm text-neutral-500 line-clamp-4">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full justify-between border-none shadow-none hover:bg-neutral-50"
          asChild
        >
          <Link to={tool.url} target="_blank" rel="noreferrer">
            Open Tool
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;