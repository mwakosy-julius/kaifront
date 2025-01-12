import { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
} from 'recharts';
import { motion } from 'framer-motion';
import { PlotDataPoint } from './types/gc-content';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {ChevronUp, ChevronDown } from 'lucide-react';

interface GCContentPlotProps {
    plotData: PlotDataPoint[];
    windowSize: number;
    averageGC: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Card className="border-primary/50">
                <CardHeader className="py-2 px-3">
                    <CardTitle className="text-sm font-medium">Position: {label}</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                    <p className="text-sm text-primary font-semibold">
                        GC Content: {payload[0].value.toFixed(1)}%
                    </p>
                </CardContent>
            </Card>
        );
    }
    return null;
};

export function GCContentPlot({ plotData, averageGC }: GCContentPlotProps) {
    const [referenceLine, setReferenceLine] = useState<number | null>(null);
    const [zoomDomain] = useState<{ start: number; end: number } | null>(null);
    const [showControls, setShowControls] = useState(true);

    const filteredData = useMemo(() => {
        if (zoomDomain) {
            return plotData.filter(
                (point) => point.position >= zoomDomain.start && point.position <= zoomDomain.end
            );
        }
        return plotData;
    }, [plotData, zoomDomain]);

    return (
        <Card className="w-full bg-background  rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">GC Content Distribution</CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowControls(!showControls)}
                >
                    {showControls ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <DotPattern
                        width={20}
                        height={20}
                        cx={1}
                        cy={1}
                        cr={1}
                        className={cn("absolute inset-0 opacity-20")}
                    />
                    <motion.div
                        className="relative w-full h-[calc(100vh-20rem)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ResponsiveContainer width="100%" height="100%" className="w-full h-full">
                            <LineChart
                                data={filteredData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 0,
                                    bottom: 15,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="position"
                                    label={{
                                        value: 'Position (bp)',
                                        position: 'insideBottom',
                                        offset: -10,
                                        className: 'fill-foreground text-sm font-medium',
                                    }}
                                    className="fill-muted-foreground"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    label={{
                                        value: 'GC Content (%)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: 10,
                                        className: 'fill-foreground text-sm font-medium',
                                    }}
                                    domain={[0, 100]}
                                    className="fill-muted-foreground"
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="top" height={36} />
                                <Line
                                    type="monotone"
                                    dataKey="gc_content"
                                    stroke="hsl(var(--primary))"
                                    name="GC Content"
                                    dot={false}
                                    strokeWidth={2}
                                    animationDuration={500}
                                />
                                <ReferenceLine
                                    y={averageGC}
                                    stroke="hsl(var(--secondary))"
                                    strokeDasharray="3 3"
                                    label={{
                                        value: `Average: ${averageGC.toFixed(1)}%`,
                                        position: 'insideTopLeft',
                                        className: 'fill-secondary text-xs',
                                    }}
                                />
                                {referenceLine !== null && (
                                    <ReferenceLine
                                        y={referenceLine}
                                        stroke="hsl(var(--destructive))"
                                        strokeDasharray="3 3"
                                        label={{
                                            value: `Reference: ${referenceLine}%`,
                                            position: 'insideTopRight',
                                            className: 'fill-destructive text-xs',
                                        }}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="reference-line">Reference Line:</Label>
                            <Slider
                                id="reference-line"
                                defaultValue={[50]}
                                max={100}
                                step={1}
                                onValueChange={(value) => setReferenceLine(value[0])}
                            />
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
}

