"use client";

import {
  Activity,
  Bot,
  Check,
  Crown,
  Database,
  FileText,
  Folder,
  Home,
  Settings,
  Star,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Subscription plans
const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started with bioinformatics",
    current: true,
    features: [
      "5 GB storage",
      "Basic tools access",
      "Community support",
      "2 concurrent jobs",
      "Standard processing speed",
    ],
    limitations: [
      "Limited workflow complexity",
      "No priority support",
      "Basic tutorials only",
    ],
  },
  {
    name: "Professional",
    price: "$29/month",
    description: "Advanced features for serious researchers",
    popular: true,
    features: [
      "100 GB storage",
      "All tools access",
      "Priority support",
      "10 concurrent jobs",
      "Fast processing speed",
      "Advanced workflows",
      "Collaboration features",
      "API access",
    ],
    limitations: [],
  },
  {
    name: "Enterprise",
    price: "$99/month",
    description: "Full-scale solution for research institutions",
    features: [
      "1 TB storage",
      "All tools + custom tools",
      "24/7 dedicated support",
      "Unlimited concurrent jobs",
      "Fastest processing speed",
      "Custom workflows",
      "Team management",
      "Full API access",
      "On-premise deployment",
      "Custom integrations",
    ],
    limitations: [],
  },
];

const currentUsage = {
  storage: { used: 2.4, total: 5, unit: "GB" },
  jobs: { used: 2, total: 2 },
  projects: { used: 3, total: 5 },
};

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
                    isActive={item.title === "Upgrade"}
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
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === "Upgrade"}
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

export default function UpgradePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Upgrade Subscription</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4">
          {/* Current Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Current Usage</CardTitle>
              <CardDescription>
                Your current plan usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>
                      {currentUsage.storage.used}/{currentUsage.storage.total}{" "}
                      {currentUsage.storage.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(currentUsage.storage.used / currentUsage.storage.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Concurrent Jobs</span>
                    <span>
                      {currentUsage.jobs.used}/{currentUsage.jobs.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(currentUsage.jobs.used / currentUsage.jobs.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Projects</span>
                    <span>
                      {currentUsage.projects.used}/{currentUsage.projects.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(currentUsage.projects.used / currentUsage.projects.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Plans */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <p className="text-muted-foreground">
                Upgrade to unlock more features and capabilities
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative ${plan.popular ? "border-primary shadow-lg" : ""} ${plan.current ? "border-green-500" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  {plan.current && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge
                        variant="secondary"
                        className="bg-green-500 text-white"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        Current Plan
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Features included:
                      </h4>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">
                          Limitations:
                        </h4>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <div className="h-4 w-4 flex-shrink-0 flex items-center justify-center">
                                <div className="h-1 w-1 bg-muted-foreground rounded-full" />
                              </div>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant={
                        plan.current
                          ? "secondary"
                          : plan.popular
                            ? "default"
                            : "outline"
                      }
                      disabled={plan.current}
                    >
                      {plan.current
                        ? "Current Plan"
                        : `Upgrade to ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Can I change my plan anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately for upgrades, and at the end
                  of your billing cycle for downgrades.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">
                  What happens to my data if I downgrade?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your data remains safe. If you exceed the storage limit of
                  your new plan, you'll need to delete some files or upgrade
                  again to access all your data.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">
                  Do you offer academic discounts?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer special pricing for academic institutions and
                  students. Contact our support team with your academic email
                  for more information.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">
                  Is there a free trial for paid plans?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, all paid plans come with a 14-day free trial. No credit
                  card required to start your trial.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
