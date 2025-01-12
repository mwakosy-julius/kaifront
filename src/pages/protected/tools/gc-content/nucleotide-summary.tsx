import { Card, CardContent } from "@/components/ui/card";
import { GCContentResponse } from './types/gc-content';

interface NucleotideSummaryProps {
    data: GCContentResponse | null;
}

export function NucleotideSummary({ data }: NucleotideSummaryProps) {
    if (!data) return null;

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{data.total_length}</div>
                        <div className="text-sm text-muted-foreground">Total Length (bp)</div>
                    </div>
                    {Object.entries(data.nucleotides).map(([nucleotide, stats]) => (
                        <div key={nucleotide} className="text-center">
                            <div className="text-2xl font-bold">{stats.percentage.toFixed(1)}%</div>
                            <div className="text-sm text-muted-foreground">
                                {nucleotide} ({stats.count})
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}