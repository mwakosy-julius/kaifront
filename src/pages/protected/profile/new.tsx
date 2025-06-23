"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  LinkIcon,
  Mail,
  Calendar,
  Users,
  Star,
  GitFork,
  Download,
  Eye,
  Settings,
  Award,
  BookOpen,
  Database,
  Microscope,
  Dna,
  BarChart3,
  FileText,
  Share2,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for the profile
const profileData = {
  name: "Dr. Sarah Chen",
  username: "sarah-chen-bio",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "Computational biologist passionate about genomics, machine learning, and precision medicine. Building tools to accelerate scientific discovery.",
  location: "Stanford, CA",
  website: "https://sarahchen.bio",
  email: "sarah@stanford.edu",
  joinDate: "Joined January 2020",
  followers: 1247,
  following: 89,
  organization: "Stanford Medicine",
  achievements: [
    { id: 1, name: "Pioneer", description: "First 100 users", icon: "🚀" },
    {
      id: 2,
      name: "Collaborator",
      description: "10+ shared projects",
      icon: "🤝",
    },
    {
      id: 3,
      name: "Innovator",
      description: "Published breakthrough tool",
      icon: "💡",
    },
    {
      id: 4,
      name: "Mentor",
      description: "Helped 50+ researchers",
      icon: "🎓",
    },
  ],
};

const popularTools = [
  {
    name: "GenomeAnalyzer",
    description:
      "Comprehensive genomic variant analysis pipeline with ML-powered predictions",
    language: "Python",
    stars: 342,
    forks: 89,
    downloads: 15420,
    isPublic: true,
    lastUpdated: "2 days ago",
  },
  {
    name: "ProteinFold-AI",
    description:
      "Deep learning model for protein structure prediction and analysis",
    language: "Python",
    stars: 567,
    forks: 123,
    downloads: 8930,
    isPublic: true,
    lastUpdated: "1 week ago",
  },
  {
    name: "RNASeq-Pipeline",
    description:
      "Automated RNA sequencing analysis workflow with quality control",
    language: "R",
    stars: 234,
    forks: 67,
    downloads: 5670,
    isPublic: true,
    lastUpdated: "3 days ago",
  },
  {
    name: "MetaGenome-Classifier",
    description:
      "Machine learning classifier for metagenomic species identification",
    language: "Python",
    stars: 189,
    forks: 45,
    downloads: 3240,
    isPublic: true,
    lastUpdated: "1 month ago",
  },
  {
    name: "BioViz-Suite",
    description:
      "Interactive visualization toolkit for biological data analysis",
    language: "JavaScript",
    stars: 298,
    forks: 78,
    downloads: 7890,
    isPublic: true,
    lastUpdated: "5 days ago",
  },
  {
    name: "CancerGenomics-DB",
    description:
      "Curated database of cancer genomic variants with clinical annotations",
    language: "SQL",
    stars: 445,
    forks: 156,
    downloads: 12340,
    isPublic: false,
    lastUpdated: "1 week ago",
  },
];

const datasets = [
  {
    name: "COVID-19 Genome Variants",
    description:
      "Comprehensive collection of SARS-CoV-2 genomic variants from global samples",
    size: "2.3 GB",
    downloads: 8934,
    citations: 45,
    lastUpdated: "1 week ago",
  },
  {
    name: "Human Protein Atlas",
    description:
      "Curated protein expression data across human tissues and cell types",
    size: "890 MB",
    downloads: 5672,
    citations: 78,
    lastUpdated: "2 weeks ago",
  },
  {
    name: "Plant Genomics Collection",
    description: "Multi-species plant genome assemblies and annotations",
    size: "15.7 GB",
    downloads: 3421,
    citations: 23,
    lastUpdated: "3 weeks ago",
  },
];

const publications = [
  {
    title: "Machine Learning Approaches for Genomic Variant Classification",
    journal: "Nature Biotechnology",
    year: 2024,
    citations: 127,
    doi: "10.1038/nbt.2024.001",
  },
  {
    title: "Automated Pipeline for Large-Scale Protein Structure Prediction",
    journal: "Bioinformatics",
    year: 2023,
    citations: 89,
    doi: "10.1093/bioinformatics/2023.001",
  },
  {
    title: "Deep Learning Models for Cancer Genomics Analysis",
    journal: "Cell",
    year: 2023,
    citations: 203,
    doi: "10.1016/j.cell.2023.001",
  },
];

// Mock contribution data for the heatmap
const generateContributionData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const contributions = Math.floor(Math.random() * 8); // 0-7 contributions per day
    data.push({
      date: date.toISOString().split("T")[0],
      count: contributions,
    });
  }
  return data;
};

const contributionData = generateContributionData();

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      Python: "bg-blue-500",
      R: "bg-purple-500",
      JavaScript: "bg-yellow-500",
      SQL: "bg-green-500",
      TypeScript: "bg-blue-600",
    };
    return colors[language] || "bg-gray-500";
  };

  const getContributionIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count <= 2) return "bg-green-200 dark:bg-green-900";
    if (count <= 4) return "bg-green-300 dark:bg-green-700";
    if (count <= 6) return "bg-green-400 dark:bg-green-600";
    return "bg-green-500 dark:bg-green-500";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-6 flex-1">
              <Avatar className="w-32 h-32 mx-auto md:mx-0">
                <AvatarImage
                  src={profileData.avatar || "/placeholder.svg"}
                  alt={profileData.name}
                />
                <AvatarFallback className="text-2xl">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <span className="text-muted-foreground">
                    @{profileData.username}
                  </span>
                </div>

                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                  {profileData.bio}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <a
                      href={profileData.website}
                      className="text-blue-600 hover:underline"
                    >
                      {profileData.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {profileData.joinDate}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">
                      {profileData.followers}
                    </span>{" "}
                    followers
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">
                      {profileData.following}
                    </span>{" "}
                    following
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Microscope className="w-4 h-4" />
                  <span className="text-sm">{profileData.organization}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
              >
                <Microscope className="w-4 h-4 mr-2" />
                Tools{" "}
                <Badge variant="secondary" className="ml-1">
                  24
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="datasets"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
              >
                <Database className="w-4 h-4 mr-2" />
                Datasets{" "}
                <Badge variant="secondary" className="ml-1">
                  12
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="publications"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                Publications{" "}
                <Badge variant="secondary" className="ml-1">
                  18
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="py-8">
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Popular Tools */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Popular Tools</h2>
                        <Button variant="ghost" size="sm">
                          Customize your pins
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {popularTools.slice(0, 6).map((tool, index) => (
                          <Card
                            key={index}
                            className="hover:shadow-md transition-shadow"
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base flex items-center gap-2">
                                  <Dna className="w-4 h-4 text-blue-600" />
                                  {tool.name}
                                </CardTitle>
                                <Badge
                                  variant={
                                    tool.isPublic ? "secondary" : "outline"
                                  }
                                >
                                  {tool.isPublic ? "Public" : "Private"}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm">
                                {tool.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <div
                                      className={`w-3 h-3 rounded-full ${getLanguageColor(tool.language)}`}
                                    />
                                    {tool.language}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {tool.stars}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <GitFork className="w-3 h-3" />
                                    {tool.forks}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Download className="w-3 h-3" />
                                    {tool.downloads.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground mt-2">
                                Updated {tool.lastUpdated}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>

                    {/* Contribution Graph */}
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                          {contributionData.filter((d) => d.count > 0).length}{" "}
                          contributions in the last year
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Less
                          </span>
                          <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
                            <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
                            <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700" />
                            <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600" />
                            <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            More
                          </span>
                        </div>
                      </div>

                      <div className="bg-card p-4 rounded-lg border overflow-x-auto">
                        <div className="grid grid-cols-53 gap-1 min-w-[800px]">
                          {contributionData.map((day, index) => (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-sm ${getContributionIntensity(day.count)}`}
                              title={`${day.count} contributions on ${day.date}`}
                            />
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Achievements */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {profileData.achievements.map((achievement) => (
                            <div
                              key={achievement.id}
                              className="flex flex-col items-center text-center p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                            >
                              <div className="text-2xl mb-1">
                                {achievement.icon}
                              </div>
                              <div className="font-medium text-sm">
                                {achievement.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {achievement.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                          <div className="flex-1">
                            <p className="text-sm">
                              Published new tool{" "}
                              <strong>GenomeAnalyzer v2.1</strong>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              2 days ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                          <div className="flex-1">
                            <p className="text-sm">
                              Shared dataset{" "}
                              <strong>COVID-19 Genome Variants</strong>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              1 week ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                          <div className="flex-1">
                            <p className="text-sm">
                              Collaborated on{" "}
                              <strong>Protein Structure Analysis</strong>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              2 weeks ago
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tools" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularTools.map((tool, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Dna className="w-5 h-5 text-blue-600" />
                            {tool.name}
                          </CardTitle>
                          <Badge
                            variant={tool.isPublic ? "secondary" : "outline"}
                          >
                            {tool.isPublic ? "Public" : "Private"}
                          </Badge>
                        </div>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-3 h-3 rounded-full ${getLanguageColor(tool.language)}`}
                              />
                              {tool.language}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {tool.stars}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {tool.downloads.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated {tool.lastUpdated}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="datasets" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {datasets.map((dataset, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Database className="w-5 h-5 text-green-600" />
                          {dataset.name}
                        </CardTitle>
                        <CardDescription>{dataset.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {dataset.size}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {dataset.downloads.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {dataset.citations} citations
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated {dataset.lastUpdated}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="publications" className="space-y-6">
                <div className="space-y-4">
                  {publications.map((pub, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{pub.title}</CardTitle>
                        <CardDescription>
                          <span className="font-medium">{pub.journal}</span> •{" "}
                          {pub.year}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {pub.citations} citations
                            </div>
                            <div className="flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              DOI: {pub.doi}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Paper
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Activity</CardTitle>
                    <CardDescription>
                      Your research and development activity over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total contributions this year</span>
                        <span className="font-semibold">
                          {contributionData.filter((d) => d.count > 0).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Longest streak</span>
                        <span className="font-semibold">23 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Current streak</span>
                        <span className="font-semibold">5 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
