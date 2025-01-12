import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GCContentResponse } from "./types/gc-content";
import { GCContentPlot } from "./gcplot";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from '@/lib/utils';
import { Dna, BarChart } from 'lucide-react';

interface GCContentResultsProps {
    results: GCContentResponse;
}

export function GCContentResults({ results }: GCContentResultsProps) {
    const [activeTab, setActiveTab] = useState('plot');

    const gcContent = (results.nucleotides.G.percentage + results.nucleotides.C.percentage).toFixed(2) || 0;
    const averageGCContent = results.gc_content.reduce((sum, gc) => sum + gc, 0) / results.gc_content.length || 0;

    const summaryItems = [
        { label: 'Total Length', value: `${results.total_length} bp` },
        { label: 'GC Content', value: `${gcContent}%` },
        { label: 'Average GC', value: `${averageGCContent.toFixed(2)}%` },
        { label: 'Max GC', value: `${Math.max(...results.gc_content).toFixed(2)}%` },
        { label: 'Min GC', value: `${Math.min(...results.gc_content).toFixed(2)}%` },
    ];

    return (
        <Card className="overflow-hidden rounded !bg-inherit border-none shadow-none">
            <CardContent className="">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

                    <TabsList className="grid w-full grid-cols-2 rounded-sm">
                        <TabsTrigger value="plot" className="flex items-center rounded-sm">
                            <BarChart className="w-4 h-4 mr-2" />
                            GC Plot
                        </TabsTrigger>
                        <TabsTrigger value="summary" className="flex items-center rounded-sm">
                            <Dna className="w-4 h-4 mr-2" />
                            Summary
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="plot">
                        <div className="w-full  relative">
                            <GCContentPlot
                                plotData={results.plot_data}
                                windowSize={results.window_size}
                                averageGC={averageGCContent}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="summary">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {summaryItems.map((item, index) => (
                                <Card key={index} className="relative overflow-hidden rounded-lg shadow-none">
                                    <DotPattern
                                        width={20}
                                        height={20}
                                        cx={1}
                                        cy={1}
                                        cr={1}
                                        className={cn("absolute inset-0 opacity-20")}
                                    />
                                    <CardContent className="p-4">
                                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                        <p className="text-2xl font-bold">{item.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {Object.entries(results.nucleotides).map(([nucleotide, stats]) => (
                                <Card key={nucleotide} className="relative overflow-hidden rounded-sm">
                                    <DotPattern
                                        width={20}
                                        height={20}
                                        cx={1}
                                        cy={1}
                                        cr={1}
                                        className={cn("absolute inset-0 opacity-20")}
                                    />
                                    <CardContent className="p-4 text-center flex justify-center items-center gap-4">
                                        <Badge variant="outline" className=" h-14 w-14 flex justify-center items-center text-lg">
                                            {nucleotide}
                                        </Badge>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <p className="text-2xl font-bold">{stats.percentage.toFixed(2)}%</p>
                                            <p className="text-sm text-muted-foreground">Count: {stats.count}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

