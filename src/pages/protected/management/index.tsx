"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserCheck,
  CreditCard,
  TrendingUp,
  Database,
  Activity,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Bell,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BioinformaticsDashboard() {
  const metrics = [
    {
      title: "Total Signups",
      value: "12,847",
      change: "+18.2%",
      changeType: "positive",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Active Users",
      value: "8,432",
      change: "+12.5%",
      changeType: "positive",
      icon: UserCheck,
      description: "last 30 days",
    },
    {
      title: "Subscribers",
      value: "2,156",
      change: "+8.1%",
      changeType: "positive",
      icon: CreditCard,
      description: "active subscriptions",
    },
    {
      title: "Subscription Revenue",
      value: "$64,890",
      change: "+15.3%",
      changeType: "positive",
      icon: TrendingUp,
      description: "monthly recurring",
    },
    {
      title: "Data Sales",
      value: "$28,450",
      change: "-2.4%",
      changeType: "negative",
      icon: Database,
      description: "this month",
    },
    {
      title: "Platform Usage",
      value: "94.2%",
      change: "+3.1%",
      changeType: "positive",
      icon: Activity,
      description: "uptime",
    },
  ];

  const popularTools = [
    { name: "Genome Sequencer", usage: 89, users: 1247 },
    { name: "Protein Analyzer", usage: 76, users: 892 },
    { name: "RNA-Seq Pipeline", usage: 68, users: 743 },
    { name: "Phylogenetic Tree", usage: 54, users: 621 },
    { name: "BLAST Search", usage: 45, users: 534 },
    { name: "Variant Caller", usage: 38, users: 412 },
  ];

  const recentActivity = [
    { action: "New user registration", count: 23, time: "Last hour" },
    { action: "Premium subscriptions", count: 5, time: "Last hour" },
    { action: "Data downloads", count: 47, time: "Last hour" },
    { action: "Tool executions", count: 156, time: "Last hour" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              BioPlatform Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor your platform performance and metrics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@bioplatform.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center text-xs">
                  {metric.changeType === "positive" ? (
                    <ChevronUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span
                    className={
                      metric.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {metric.change}
                  </span>
                  <span className="text-gray-500 ml-1">
                    {metric.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Popular Tools
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {popularTools.map((tool, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">
                      {tool.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{tool.users} users</span>
                      <Badge variant="secondary">{tool.usage}%</Badge>
                    </div>
                  </div>
                  <Progress value={tool.usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.count}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    $64,890
                  </div>
                  <div className="text-sm text-green-700">
                    Subscription Revenue
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    69.5% of total
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    $28,450
                  </div>
                  <div className="text-sm text-blue-700">Data Sales</div>
                  <div className="text-xs text-blue-600 mt-1">
                    30.5% of total
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600 mb-1">
                    $93,340
                  </div>
                  <div className="text-sm text-gray-700">Total Revenue</div>
                  <div className="text-xs text-gray-600 mt-1">This month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
