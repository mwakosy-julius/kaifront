import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlignCenterVertical,
    Table as TableIcon,
    BarChart,
} from "lucide-react";
import { AlignmentResultsProps } from './types/alignment';
import { SequenceTable } from './components/sequence-table';
import { SequenceChart } from './components/sequence-chart';

export const AlignmentResults: React.FC<AlignmentResultsProps> = ({ results }) => {
    return (
        <div className="mt-4 border-t px-[22px] py-5 !bg-inherit">
            <h2 className="text-3xl font-semibold mb-6">Pairwise Alignment Results</h2>
            
            <Tabs defaultValue="alignment" className="w-full h-full">
                <TabsList className="grid w-full grid-cols-3 gap-2 h-14 rounded-none bg-card/5">
                    <TabsTrigger value="alignment" className="gap-2 h-12 !shadow-none focus:!bg-secondary rounded-none border">
                        <AlignCenterVertical className="h-4 w-4" />
                        Alignment
                    </TabsTrigger>
                    <TabsTrigger value="table" className="gap-2 h-12 !shadow-none focus:!bg-secondary rounded-none border">
                        <TableIcon className="h-4 w-4" />
                        Table
                    </TabsTrigger>
                    <TabsTrigger value="chart" className="gap-2 h-12 !shadow-none focus:!bg-secondary rounded-none border">
                        <BarChart className="h-4 w-4" />
                        Chart
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="alignment" className="space-y-4 mt-6 ">
                    <div className="!bg-background p-6 rounded-lg">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Scores</h3>
                                    <div className="space-y-2">
                                        <p>Match Score: {results.results.match_score}</p>
                                        <p>Gap Open: {results.results.gap_open}</p>
                                        <p>Gap Extend: {results.results.gap_extend}</p>
                                        <p>Alignment Score: {results.results.alignment_score}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-3">Alignment Type</h3>
                                    <p className="capitalize">
                                        {results.alignment_type.replace('_', ' ')}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium">Aligned Sequences</h3>
                                <div className="space-y-2 font-mono bg-background/50 p-4 rounded-md">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Sequence 1:</p>
                                        <p className="break-all">
                                            {results.results.sequence1_aligned}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Sequence 2:</p>
                                        <p className="break-all">
                                            {results.results.sequence2_aligned}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="table" className="mt-6">
                    <div className="!bg-background rounded-lg">
                        <SequenceTable
                            sequence1={results.results.sequence1_aligned}
                            sequence2={results.results.sequence2_aligned}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="chart" className="mt-6">
                    <div className="!bg-background rounded-lg">
                        <SequenceChart
                            sequence1={results.results.sequence1_aligned}
                            sequence2={results.results.sequence2_aligned}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};