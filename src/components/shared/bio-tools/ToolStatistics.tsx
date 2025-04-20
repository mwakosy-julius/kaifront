import React from "react";
import { LucideIcon } from "lucide-react";

export interface ToolStat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface ToolStatisticsProps {
  stats: ToolStat[];
  className?: string;
  iconContainerClassName?: string;
}

const ToolStatistics: React.FC<ToolStatisticsProps> = ({
  stats,
  className = "grid grid-cols-3 gap-4 p-4 rounded bg-muted/50",
  iconContainerClassName = "p-3 rounded bg-primary/10",
}) => {
  return (
    <div className={className}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={iconContainerClassName}>
            <stat.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{stat.label}</p>
            <p className="text-sm text-muted-foreground">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolStatistics;
