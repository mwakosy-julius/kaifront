import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, BookOpen, Share2, Info, LucideIcon } from "lucide-react";

export interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  error?: string;
  footerContent?: ReactNode;
  toolStats?: {
    label: string;
    value: string;
    icon: LucideIcon;
  }[];
  documentationUrl?: string;
  shareUrl?: string;
  infoText?: string;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({
  title,
  description,
  icon: Icon,
  children,
  error,
  footerContent,
  toolStats,
  documentationUrl,
  shareUrl,
  infoText,
}) => {
  return (
    <div className="container mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                  <Icon className="w-8 h-8" />
                  {title}
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                {description}
              </CardDescription>
              <div className="flex gap-2 mt-2">
                {documentationUrl && (
                  <Badge variant="outline" className="text-xs">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Documentation
                  </Badge>
                )}
                {shareUrl && (
                  <Badge variant="outline" className="text-xs">
                    <Share2 className="w-3 h-3 mr-1" />
                    Share Results
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {toolStats && (
            <>
              <div className="grid grid-cols-3 gap-4 p-4 rounded bg-muted/50">
                {toolStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="p-3 rounded bg-primary/10">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{stat.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
            </>
          )}

          {children}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        {(footerContent || infoText) && (
          <CardFooter className="flex flex-col gap-2">
            {infoText && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4 mt-0.5" />
                <div className="space-y-1">
                  <p>{infoText}</p>
                </div>
              </div>
            )}
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ToolLayout;
