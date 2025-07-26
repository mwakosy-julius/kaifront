import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  MapPin,
  Mail,
  Award,
  BarChart3,
  Users,
  Database,
  Folder,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const recentAnalyses = [
    {
      title: "RNA-Seq Differential Expression",
      project: "Cancer Study 2024",
      date: "2024-01-15",
      status: "completed",
    },
    {
      title: "Genome Assembly",
      project: "Microbial Genomics",
      date: "2024-01-12",
      status: "completed",
    },
    {
      title: "Protein Structure Prediction",
      project: "Drug Discovery",
      date: "2024-01-10",
      status: "completed",
    },
  ];

  const achievements = [
    {
      title: "First Analysis",
      description: "Completed your first bioinformatics analysis",
      date: "Dec 2023",
      icon: "🎯",
    },
    {
      title: "Data Explorer",
      description: "Analyzed over 100 datasets",
      date: "Jan 2024",
      icon: "🔍",
    },
    {
      title: "Workflow Master",
      description: "Created 10 custom workflows",
      date: "Jan 2024",
      icon: "⚡",
    },
    {
      title: "Collaborator",
      description: "Shared projects with team members",
      date: "Jan 2024",
      icon: "🤝",
    },
  ];

  const stats = [
    {
      label: "Total Analyses",
      value: "156",
      icon: BarChart3,
      change: "+12 this month",
    },
    {
      label: "Data Processed",
      value: "2.4TB",
      icon: Database,
      change: "+340GB this month",
    },
    {
      label: "Active Projects",
      value: "8",
      icon: Folder,
      change: "+2 this month",
    },
    {
      label: "Team Members",
      value: "5",
      icon: Users,
      change: "No change",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="flex items-start space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/api/placeholder/80/80" alt="Profile picture" />
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {user?.name || "Unknown User"}
            </h1>
            <p className="text-lg text-muted-foreground">
              Senior Bioinformatics Researcher
            </p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>UDSM</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarDays className="w-4 h-4" />
                <span>Joined Jan 2025</span>
              </div>
            </div>
          </div>
        </div>
        <Button href="edit">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <stat.icon className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>
                Your latest completed bioinformatics analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <div
                    key={analysis.title}
                    className="flex items-center justify-between p-4 transition-colors border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <h3 className="font-medium">{analysis.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {analysis.project} • {analysis.date}
                      </p>
                    </div>
                    <Badge variant="secondary">{analysis.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>
                Milestones and accomplishments in your bioinformatics journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className="flex items-start p-4 space-x-3 border rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Earned {achievement.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>
                Professional background and research interests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium">Bio</h3>
                <p className="text-muted-foreground">
                  Dr. John Doe is a Senior Bioinformatics Researcher with over 8
                  years of experience in computational biology and genomics. He
                  specializes in RNA-seq analysis, genome assembly, and machine
                  learning applications in biology. His research focuses on
                  understanding disease mechanisms through multi-omics
                  approaches.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Cancer Genomics</Badge>
                  <Badge variant="outline">Machine Learning</Badge>
                  <Badge variant="outline">RNA-seq Analysis</Badge>
                  <Badge variant="outline">Precision Medicine</Badge>
                  <Badge variant="outline">Multi-omics Integration</Badge>
                  <Badge variant="outline">Biomarker Discovery</Badge>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Education</h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">
                      Ph.D. in Computational Biology
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Harvard University • 2018
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">M.S. in Bioinformatics</p>
                    <p className="text-sm text-muted-foreground">
                      Stanford University • 2014
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">B.S. in Computer Science</p>
                    <p className="text-sm text-muted-foreground">MIT • 2012</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Publications</h3>
                <p className="text-muted-foreground">
                  Author of 25+ peer-reviewed publications in leading journals
                  including Nature, Science, and Bioinformatics. Cited over
                  1,200 times with an h-index of 18.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
