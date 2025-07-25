import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stats } from "@/lib/services/tools";

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <Card>
    <CardHeader>
      <CardTitle>Analysis Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 text-center border rounded-lg bg-card">
          <p className="text-sm font-medium text-muted-foreground">
            Total Reads
          </p>
          <p className="text-2xl font-bold text-primary">
            {stats.total_reads.toLocaleString()}
          </p>
        </div>
        <div className="p-4 text-center border rounded-lg bg-card">
          <p className="text-sm font-medium text-muted-foreground">
            Classified k-mers
          </p>
          <p className="text-2xl font-bold text-primary">
            {stats.classified_kmers.toLocaleString()}
          </p>
        </div>
        <div className="p-4 text-center border rounded-lg bg-card">
          <p className="text-sm font-medium text-muted-foreground">
            Unique Genera
          </p>
          <p className="text-2xl font-bold text-primary">
            {stats.unique_genera}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatsGrid;
