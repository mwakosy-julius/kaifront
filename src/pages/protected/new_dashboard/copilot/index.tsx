"use client";

import type React from "react";

import {
  Activity,
  Bot,
  Database,
  FileText,
  Folder,
  Home,
  MessageSquare,
  Plus,
  Send,
  Settings,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Navigation items
const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Copilot", url: "/copilot", icon: Bot },
  { title: "Tools", url: "/tools", icon: Zap },
  { title: "Workflows", url: "/workflows", icon: Workflow },
  { title: "Data", url: "/data", icon: Database },
  { title: "Results", url: "/results", icon: FileText },
  { title: "Projects", url: "/projects", icon: Folder },
];

const resourcesItems = [
  { title: "Tutorials", url: "/tutorials", icon: FileText },
  { title: "Notifications", url: "/notifications", icon: Activity },
  { title: "Upgrade", url: "/upgrade", icon: Zap },
];

// Mock conversation history
const conversations = [
  {
    id: "conv_001",
    title: "RNA-seq Analysis Help",
    lastMessage: "How do I interpret differential expression results?",
    timestamp: "2 hours ago",
  },
  {
    id: "conv_002",
    title: "BLAST Search Optimization",
    lastMessage: "What parameters should I use for protein BLAST?",
    timestamp: "1 day ago",
  },
  {
    id: "conv_003",
    title: "Workflow Creation",
    lastMessage: "Help me build a variant calling pipeline",
    timestamp: "3 days ago",
  },
];

function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BioAnalytics</span>
                  <span className="truncate text-xs">Platform v2.1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === "Copilot"}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conv) => (
                <SidebarMenuItem key={conv.id}>
                  <SidebarMenuButton className="flex-col items-start h-auto py-2">
                    <div className="flex items-center gap-2 w-full">
                      <MessageSquare className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate text-sm font-medium">
                        {conv.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {conv.lastMessage}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {conv.timestamp}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <Users />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function CopilotPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <Bot className="h-5 w-5" />
            <h1 className="text-lg font-semibold">AI Copilot</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Connected
            </Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-8">
              {/* Welcome Message */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">
                  What do you want to analyze today?
                </h2>
                <p className="text-muted-foreground">
                  I'm your AI assistant for bioinformatics. Ask me about data
                  analysis, tool recommendations, workflow optimization, or any
                  research questions.
                </p>
              </div>

              {/* Chat Input */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Connect data and start chatting! Ask me about RNA-seq, BLAST, workflows, or any bioinformatics question..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Configuration Options */}
                    <div className="flex items-center gap-4 text-sm">
                      <Select defaultValue="default">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="concise">Concise</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="tools">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tools">Tools</SelectItem>
                          <SelectItem value="analysis">Analysis</SelectItem>
                          <SelectItem value="workflows">Workflows</SelectItem>
                        </SelectContent>
                      </Select>

                      <Badge variant="outline">Advanced Reasoning</Badge>
                      <Badge variant="outline">Extended Memory</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
