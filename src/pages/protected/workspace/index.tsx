"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  Play,
  Pause,
  Save,
  Share2,
  Download,
  Settings,
  Eye,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Database,
  Microscope,
  BarChart3,
  Dna,
  Activity,
  GitBranch,
  Target,
  Layers,
  X,
  Minimize2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Mock data for available tools
const availableTools = [
  {
    id: "quality-control",
    name: "Quality Control",
    category: "Preprocessing",
    description: "Assess and filter raw sequencing data quality",
    icon: <Target className="w-4 h-4" />,
    inputs: ["FASTQ", "FASTA"],
    outputs: ["Filtered FASTQ", "QC Report"],
    estimatedTime: "5-10 min",
    color: "bg-blue-500",
  },
  {
    id: "sequence-alignment",
    name: "Sequence Alignment",
    category: "Alignment",
    description: "Align sequences to reference genome",
    icon: <GitBranch className="w-4 h-4" />,
    inputs: ["FASTQ", "Reference Genome"],
    outputs: ["BAM", "Alignment Stats"],
    estimatedTime: "15-30 min",
    color: "bg-green-500",
  },
  {
    id: "variant-calling",
    name: "Variant Calling",
    category: "Analysis",
    description: "Identify genetic variants from aligned sequences",
    icon: <Dna className="w-4 h-4" />,
    inputs: ["BAM", "Reference Genome"],
    outputs: ["VCF", "Variant Report"],
    estimatedTime: "10-20 min",
    color: "bg-purple-500",
  },
  {
    id: "annotation",
    name: "Variant Annotation",
    category: "Analysis",
    description: "Annotate variants with functional information",
    icon: <FileText className="w-4 h-4" />,
    inputs: ["VCF"],
    outputs: ["Annotated VCF", "Annotation Report"],
    estimatedTime: "5-15 min",
    color: "bg-orange-500",
  },
  {
    id: "visualization",
    name: "Data Visualization",
    category: "Visualization",
    description: "Generate plots and charts from analysis results",
    icon: <BarChart3 className="w-4 h-4" />,
    inputs: ["VCF", "BAM", "Reports"],
    outputs: ["Plots", "Interactive Charts"],
    estimatedTime: "2-5 min",
    color: "bg-pink-500",
  },
  {
    id: "statistical-analysis",
    name: "Statistical Analysis",
    category: "Analysis",
    description: "Perform statistical tests and calculations",
    icon: <Activity className="w-4 h-4" />,
    inputs: ["VCF", "Phenotype Data"],
    outputs: ["Statistics Report", "P-values"],
    estimatedTime: "5-10 min",
    color: "bg-cyan-500",
  },
];

// Mock pipeline steps
interface PipelineStep {
  id: string;
  toolId: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  progress: number;
  inputs: string[];
  outputs: string[];
  startTime?: string;
  endTime?: string;
  logs: string[];
  results?: any;
  position: { x: number; y: number };
  connections: string[];
}

const AnalysisWorkspace = () => {
  const [projectName, setProjectName] = useState("COVID-19 Genome Analysis");
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "sample_1.fastq", size: "2.3 GB", type: "FASTQ", status: "ready" },
    { name: "sample_2.fastq", size: "2.1 GB", type: "FASTQ", status: "ready" },
    {
      name: "reference_genome.fasta",
      size: "890 MB",
      type: "FASTA",
      status: "ready",
    },
  ]);
  const [activeTab, setActiveTab] = useState("pipeline");
  const [toolFilter, setToolFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const canvasRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Preprocessing",
    "Alignment",
    "Analysis",
    "Visualization",
  ];

  const filteredTools = availableTools.filter((tool) => {
    const matchesFilter = tool.name
      .toLowerCase()
      .includes(toolFilter.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesFilter && matchesCategory;
  });

  const addToolToPipeline = useCallback((tool: any) => {
    const newStep: PipelineStep = {
      id: `step-${Date.now()}`,
      toolId: tool.id,
      name: tool.name,
      status: "pending",
      progress: 0,
      inputs: tool.inputs,
      outputs: tool.outputs,
      logs: [],
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      connections: [],
    };
    setPipelineSteps((prev) => [...prev, newStep]);
  }, []);

  const removeStep = useCallback(
    (stepId: string) => {
      setPipelineSteps((prev) => prev.filter((step) => step.id !== stepId));
      if (selectedStep === stepId) {
        setSelectedStep(null);
      }
    },
    [selectedStep],
  );

  const runPipeline = useCallback(() => {
    setIsRunning(true);
    // Simulate pipeline execution
    pipelineSteps.forEach((step, index) => {
      setTimeout(() => {
        setPipelineSteps((prev) =>
          prev.map((s) =>
            s.id === step.id
              ? {
                  ...s,
                  status: "running" as const,
                  startTime: new Date().toLocaleTimeString(),
                }
              : s,
          ),
        );

        // Simulate progress
        const progressInterval = setInterval(() => {
          setPipelineSteps((prev) =>
            prev.map((s) => {
              if (s.id === step.id && s.status === "running") {
                const newProgress = Math.min(
                  s.progress + Math.random() * 20,
                  100,
                );
                if (newProgress >= 100) {
                  clearInterval(progressInterval);
                  return {
                    ...s,
                    status: "completed" as const,
                    progress: 100,
                    endTime: new Date().toLocaleTimeString(),
                    logs: [...s.logs, `${s.name} completed successfully`],
                  };
                }
                return { ...s, progress: newProgress };
              }
              return s;
            }),
          );
        }, 500);
      }, index * 2000);
    });

    setTimeout(
      () => {
        setIsRunning(false);
      },
      pipelineSteps.length * 2000 + 5000,
    );
  }, [pipelineSteps]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "running":
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50";
      case "running":
        return "border-blue-500 bg-blue-50";
      case "error":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Microscope className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold">{projectName}</h1>
              <Badge variant="secondary">Active</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              onClick={runPipeline}
              disabled={isRunning || pipelineSteps.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Pipeline
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools & Files */}
        <div className="w-80 border-r bg-card flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="flex-1 p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-3">Input Files</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    FASTQ, FASTA, VCF, BAM supported
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {file.size} • {file.type}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{file.status}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="flex-1 flex flex-col">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Search tools..."
                    value={toolFilter}
                    onChange={(e) => setToolFilter(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex flex-wrap gap-1">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        className="cursor-pointer text-xs"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 px-4">
                <div className="space-y-2 pb-4">
                  {filteredTools.map((tool) => (
                    <Card
                      key={tool.id}
                      className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => addToolToPipeline(tool)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-md ${tool.color} text-white`}
                        >
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{tool.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {tool.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {tool.estimatedTime}
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400" />
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="results" className="flex-1 p-4">
              <div className="space-y-4">
                <h3 className="font-medium">Pipeline Results</h3>
                {pipelineSteps.filter((step) => step.status === "completed")
                  .length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No results yet</p>
                    <p className="text-xs">Run your pipeline to see results</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {pipelineSteps
                      .filter((step) => step.status === "completed")
                      .map((step) => (
                        <Card key={step.id} className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{step.name}</p>
                              <p className="text-xs text-gray-500">
                                Completed at {step.endTime}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Pipeline Canvas */}
          <div
            className="flex-1 relative bg-gray-50 overflow-auto"
            ref={canvasRef}
          >
            {pipelineSteps.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Layers className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Build Your Analysis Pipeline
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Drag tools from the sidebar to create your workflow
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <span>1. Upload data</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>2. Add tools</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>3. Run pipeline</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pipelineSteps.map((step, index) => (
                    <Card
                      key={step.id}
                      className={`relative cursor-pointer transition-all hover:shadow-lg ${getStatusColor(step.status)} ${
                        selectedStep === step.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(step.status)}
                            <CardTitle className="text-sm">
                              {step.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              Step {index + 1}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-6 h-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeStep(step.id);
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {step.status === "running" && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{Math.round(step.progress)}%</span>
                            </div>
                            <Progress value={step.progress} className="h-2" />
                          </div>
                        )}
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-medium">Inputs:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {step.inputs.map((input, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {input}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Outputs:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {step.outputs.map((output, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {output}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        {step.status === "completed" && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-green-600">
                                ✓ Completed
                              </span>
                              <span>{step.endTime}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel - Logs & Details */}
          {selectedStep && (
            <div className="h-64 border-t bg-card">
              <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">
                    {pipelineSteps.find((s) => s.id === selectedStep)?.name}{" "}
                    Details
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStep(null)}
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="space-y-2 text-sm">
                    {pipelineSteps
                      .find((s) => s.id === selectedStep)
                      ?.logs.map((log, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-xs text-gray-500 mt-0.5">
                            {new Date().toLocaleTimeString()}
                          </span>
                          <span>{log}</span>
                        </div>
                      ))}
                    {pipelineSteps.find((s) => s.id === selectedStep)?.logs
                      .length === 0 && (
                      <p className="text-gray-500">No logs available</p>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Pipeline Overview */}
        <div className="w-64 border-l bg-card p-4 space-y-4">
          <div>
            <h3 className="font-medium mb-3">Pipeline Overview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Steps:</span>
                <span className="font-medium">{pipelineSteps.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-medium text-green-600">
                  {pipelineSteps.filter((s) => s.status === "completed").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Running:</span>
                <span className="font-medium text-blue-600">
                  {pipelineSteps.filter((s) => s.status === "running").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-medium text-gray-600">
                  {pipelineSteps.filter((s) => s.status === "pending").length}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Execution Timeline</h3>
            <div className="space-y-2">
              {pipelineSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="flex-1 truncate">{step.name}</span>
                  {getStatusIcon(step.status)}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Settings className="w-4 h-4 mr-2" />
                Pipeline Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Pipeline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisWorkspace;
