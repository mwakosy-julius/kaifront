import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Database,
  Upload,
  Download,
  FileText,
  Folder,
  Search,
  Plus,
  Globe,
  User,
  Filter,
  SortAsc,
} from "lucide-react";

const Data = () => {
  const platformDatasets = [
    {
      name: "Human Genome Reference GRCh38",
      type: "FASTA",
      size: "3.2 GB",
      lastModified: "2 days ago",
      status: "public",
      downloads: "12.5K",
      source: "NCBI",
    },
    {
      name: "1000 Genomes Project",
      type: "VCF",
      size: "2.8 TB",
      lastModified: "1 week ago",
      status: "public",
      downloads: "8.9K",
      source: "1000 Genomes",
    },
    {
      name: "TCGA Cancer Datasets",
      type: "Multi-format",
      size: "45.2 GB",
      lastModified: "3 days ago",
      status: "public",
      downloads: "15.2K",
      source: "TCGA",
    },
    {
      name: "UniProt Protein Database",
      type: "FASTA",
      size: "125 GB",
      lastModified: "1 day ago",
      status: "public",
      downloads: "22.1K",
      source: "UniProt",
    },
  ];

  const userDatasets = [
    {
      name: "RNA-Seq Sample Data",
      type: "FASTQ",
      size: "12.8 GB",
      lastModified: "1 week ago",
      status: "private",
    },
    {
      name: "Protein Structures",
      type: "PDB",
      size: "856 MB",
      lastModified: "3 days ago",
      status: "shared",
    },
    {
      name: "Variant Call Results",
      type: "VCF",
      size: "145 MB",
      lastModified: "1 day ago",
      status: "private",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "public":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "private":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "shared":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data</h1>
          <p className="text-muted-foreground">
            Discover platform datasets and manage your own biological data
            repositories.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        <Input
          placeholder="Search datasets by name, type, or source..."
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-muted-foreground">
                  Platform Datasets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">My Datasets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1.2TB</p>
                <p className="text-sm text-muted-foreground">Total Storage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Download className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1,089</p>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Platform Data vs My Data */}
      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Platform Datasets
          </TabsTrigger>
          <TabsTrigger value="mydata" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            My Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Datasets</CardTitle>
              <CardDescription>
                Curated datasets provided by the platform from trusted sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformDatasets.map((dataset) => (
                  <div
                    key={dataset.name}
                    className="flex items-center justify-between p-4 transition-colors border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{dataset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dataset.type} • {dataset.size} •{" "}
                          {dataset.lastModified} • {dataset.downloads} downloads
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Source: {dataset.source}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(dataset.status)}>
                        {dataset.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mydata" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">My Datasets</h3>
              <p className="text-sm text-muted-foreground">
                Your uploaded and personal datasets
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Dataset
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {userDatasets.map((dataset) => (
                  <div
                    key={dataset.name}
                    className="flex items-center justify-between p-4 transition-colors border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{dataset.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dataset.type} • {dataset.size} •{" "}
                          {dataset.lastModified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(dataset.status)}>
                        {dataset.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {userDatasets.length === 0 && (
                <div className="py-8 text-center">
                  <Folder className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No datasets uploaded yet
                  </p>
                  <Button className="mt-4">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Dataset
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Data;
