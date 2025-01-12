import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    AlignCenterVertical,
    Table,
    BarChart,
} from "lucide-react";
import { AlignmentResultsProps } from './types';

export const AlignmentResults: React.FC<AlignmentResultsProps> = ({ results }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full shadow-none rounded-sm mt-4 gap-2"
                >
                    <AlignCenterVertical className="h-4 w-4" />
                    View Alignment Results
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl !rounded h-[80vh]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl">Pairwise Alignment Results</DialogTitle>
                    </div>
                </DialogHeader>
                <ScrollArea className="h-[calc(100vh-14rem)] overflow-hidden flex flex-col justify-start items-start">
                    <Tabs defaultValue="alignment" className="w-full !rounded-none">
                        <TabsList className="grid w-full grid-cols-3 !rounded-none">
                            <TabsTrigger value="alignment" className="gap-2 !rounded !shadow-none">
                                <AlignCenterVertical className="h-4 w-4" />
                                Alignment
                            </TabsTrigger>
                            <TabsTrigger value="table" className="gap-2 !rounded !shadow-none">
                                <Table className="h-4 w-4" />
                                Table
                            </TabsTrigger>
                            <TabsTrigger value="chart" className="gap-2 !rounded !shadow-none">
                                <BarChart className="h-4 w-4" />
                                Chart
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="alignment" className="space-y-4 ">
                            <div className="bg-muted/50 p-6 font-mono !rounded !shadow-none h-full">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Scores</h3>
                                            <div className="space-y-2">
                                                <p>Match Score: {results.results.match_score}</p>
                                                <p>Gap Open: {results.results.gap_open}</p>
                                                <p>Gap Extend: {results.results.gap_extend}</p>
                                                <p>Alignment Score: {results.results.alignment_score}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium mb-2">Alignment Type</h3>
                                            <p className="capitalize">{results.alignment_type.replace('_', ' ')}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">Aligned Sequences</h3>
                                        <div className="space-y-1">
                                            <p className="break-all">
                                                Sequence 1: {results.results.sequence1_aligned}
                                            </p>
                                            <p className="break-all">
                                                Sequence 2: {results.results.sequence2_aligned}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="table">
                            <div
                                className="overflow-x-auto rounded-lg bg-muted/50 p-6"
                                dangerouslySetInnerHTML={{ __html: results.table }}
                            />
                        </TabsContent>

                        <TabsContent value="chart">
                            <div
                                className="overflow-x-auto rounded-lg bg-muted/50 p-6"
                                dangerouslySetInnerHTML={{ __html: results.chart }}
                            />
                        </TabsContent>
                    </Tabs>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};