import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Send, ChevronDown, Settings } from "lucide-react";

const Copilot = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 space-y-8">
      {/* Main Heading */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-semibold text-foreground">
          What do you want to analyze today?
        </h1>
      </div>

      {/* Chat Input */}
      <div className="w-full max-w-4xl">
        <div className="relative flex items-center">
          <div className="flex items-center w-full border rounded-lg bg-muted/50 border-border">
            <Button variant="ghost" size="icon" className="ml-2">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Input
              placeholder="Connect data and start chatting!"
              className="px-4 py-6 text-lg bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button
            size="icon"
            className="w-12 h-12 ml-3 rounded-full bg-primary hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Options Bar */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 transition-colors cursor-pointer hover:text-foreground">
          <span className="font-medium">J</span>
          <span>Default</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-2 transition-colors cursor-pointer hover:text-foreground">
          <Settings className="w-4 h-4" />
          <span>Tools</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        <div className="transition-colors cursor-pointer hover:text-foreground">
          Advanced Reasoning
        </div>

        <div className="transition-colors cursor-pointer hover:text-foreground">
          Extended Memory
        </div>
      </div>
    </div>
  );
};

export default Copilot;
