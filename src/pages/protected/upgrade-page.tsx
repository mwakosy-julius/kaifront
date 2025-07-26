import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Users } from "lucide-react";

const Upgrade = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for students and researchers getting started",
      icon: Users,
      features: [
        "Up to 3 analyses per month",
        "10 GB storage",
        "Basic workflow templates",
        "Community support",
        "Standard processing speed",
      ],
      limitations: [
        "Limited to public datasets",
        "No priority support",
        "Basic export options",
      ],
      current: true,
    },
    {
      name: "Professional",
      price: "$29/month",
      description: "Ideal for active researchers and small teams",
      icon: Star,
      features: [
        "Unlimited analyses",
        "100 GB storage",
        "Advanced workflow library",
        "Priority email support",
        "Fast processing speed",
        "Private datasets",
        "Advanced export options",
        "Collaboration tools",
      ],
      limitations: [],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99/month",
      description: "For large teams and institutional use",
      icon: Crown,
      features: [
        "Everything in Professional",
        "1 TB storage",
        "Custom workflows",
        "24/7 phone support",
        "High-performance computing",
        "Advanced security",
        "Team management",
        "API access",
        "Custom integrations",
      ],
      limitations: [],
    },
  ];

  const currentUsage = {
    analyses: { used: 2, limit: 3 },
    storage: { used: 4.2, limit: 10, unit: "GB" },
    users: { used: 1, limit: 1 },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Upgrade Your Plan</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Scale your bioinformatics research with more storage, faster
          processing, and advanced features.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Current Usage</span>
          </CardTitle>
          <CardDescription>Monitor your current plan usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyses this month</span>
                <span>
                  {currentUsage.analyses.used}/{currentUsage.analyses.limit}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{
                    width: `${
                      (currentUsage.analyses.used /
                        currentUsage.analyses.limit) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage used</span>
                <span>
                  {currentUsage.storage.used}/{currentUsage.storage.limit}{" "}
                  {currentUsage.storage.unit}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{
                    width: `${
                      (currentUsage.storage.used / currentUsage.storage.limit) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Team members</span>
                <span>
                  {currentUsage.users.used}/{currentUsage.users.limit}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{
                    width: `${
                      (currentUsage.users.used / currentUsage.users.limit) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.popular ? "ring-2 ring-primary" : ""} ${
              plan.current ? "border-green-500" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute transform -translate-x-1/2 -top-2 left-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            {plan.current && (
              <Badge className="absolute text-white transform -translate-x-1/2 bg-green-500 -top-2 left-1/2">
                Current Plan
              </Badge>
            )}

            <CardHeader className="text-center">
              <plan.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">{plan.price}</div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Check className="flex-shrink-0 w-4 h-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="pt-4 space-y-2 border-t">
                  <p className="text-sm font-medium text-muted-foreground">
                    Limitations:
                  </p>
                  {plan.limitations.map((limitation) => (
                    <div
                      key={limitation}
                      className="flex items-center space-x-2"
                    >
                      <span className="w-4 h-4 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Button
                className="w-full"
                variant={
                  plan.current
                    ? "outline"
                    : plan.popular
                    ? "default"
                    : "outline"
                }
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Need a Custom Solution?</CardTitle>
          <CardDescription>
            Contact our team for enterprise-grade solutions tailored to your
            organization's needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button variant="outline">Contact Sales</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upgrade;
