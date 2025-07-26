import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Database,
  Cpu,
  BarChart3,
  Zap,
  FileText,
  Workflow,
  Sparkles,
  Wrench,
  Bell,
} from "lucide-react";

const DashboardContent = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 TB</div>
            <p className="text-xs text-muted-foreground">68% of quota</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-xs text-muted-foreground">Normal load</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Jobs</CardTitle>
            <p className="text-sm text-muted-foreground">
              jobs and their status
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Workflow className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Workflow</div>
                    <div className="text-xs text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">Running</Badge>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Tool</div>
                    <div className="text-xs text-muted-foreground">
                      4 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>Completed</Badge>
                  <span className="text-sm text-muted-foreground">100%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Workflow className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Workflow</div>
                    <div className="text-xs text-muted-foreground">
                      1 hour ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Queued</Badge>
                  <span className="text-sm text-muted-foreground">0%</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Tool</div>
                    <div className="text-xs text-muted-foreground">
                      6 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">Failed</Badge>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favourite Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Favourite Tools</CardTitle>
            <p className="text-sm text-muted-foreground">
              Launch your most frequently used bioinformatics tools
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">BLAST</div>
                    <div className="text-xs text-muted-foreground">
                      Basic Local Alignment Search Tool
                    </div>
                  </div>
                </div>
                <Button size="sm">Launch</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">FastQC</div>
                    <div className="text-xs text-muted-foreground">
                      Quality control for sequencing data
                    </div>
                  </div>
                </div>
                <Button size="sm">Launch</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">BWA</div>
                    <div className="text-xs text-muted-foreground">
                      Burrows-Wheeler Aligner
                    </div>
                  </div>
                </div>
                <Button size="sm">Launch</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">SAMtools</div>
                    <div className="text-xs text-muted-foreground">
                      Sequence Alignment/Map tools
                    </div>
                  </div>
                </div>
                <Button size="sm">Launch</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What's New Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            What's New
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Latest updates, tools, workflows, and features on the platform
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 transition-colors border rounded-lg hover:bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 mt-1 text-blue-600 rounded-md bg-blue-500/10">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    New Tool: AlphaFold3 Integration
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-blue-600 bg-blue-500/10 border-blue-500/20"
                  >
                    Tool
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Predict protein structures with the latest AlphaFold3 model
                  directly in your workflows.
                </p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 transition-colors border rounded-lg hover:bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 mt-1 text-green-600 rounded-md bg-green-500/10">
                <Workflow className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">RNA-Seq Pipeline v2.0</p>
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-500/10 border-green-500/20"
                  >
                    Workflow
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Enhanced performance and new quality control metrics for RNA
                  sequencing analysis.
                </p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 transition-colors border rounded-lg hover:bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 mt-1 text-purple-600 rounded-md bg-purple-500/10">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    Interactive Data Visualization
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-purple-600 bg-purple-500/10 border-purple-500/20"
                  >
                    Feature
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Create interactive plots and charts with the new visualization
                  toolkit.
                </p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 transition-colors border rounded-lg hover:bg-muted/50">
              <div className="flex items-center justify-center w-8 h-8 mt-1 text-orange-600 rounded-md bg-orange-500/10">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">
                    Platform Maintenance Scheduled
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-orange-600 bg-orange-500/10 border-orange-500/20"
                  >
                    News
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Scheduled maintenance on Sunday, 3 AM - 5 AM UTC for
                  performance improvements.
                </p>
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status</CardTitle>
          <p className="text-sm text-muted-foreground">
            Resources and cluster information
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm font-medium">Storage</div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">128/256</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Memory Usage</div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">1.2TB/2TB</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm font-medium">Queue Length</div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">8 jobs</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
