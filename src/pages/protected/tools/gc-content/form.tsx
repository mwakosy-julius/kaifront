import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GCContentRequest, gcContentSchema } from "./schema";

interface GCContentFormProps {
    onSubmit: (data: GCContentRequest) => void;
    loading: boolean;
}

export function GCContentForm({ onSubmit, loading }: GCContentFormProps) {
    const form = useForm<GCContentRequest>({
        resolver: zodResolver(gcContentSchema),
        defaultValues: {
            sequence: 'GTGCTAGCTGTAGCTTATTATTATTACAAGTCGATGTCGCGGCGGCCCTA',
            window_size: 10
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* DNA Sequence Field */}
                <FormField
                    control={form.control}
                    name="sequence"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="sequence" className="text-lg font-medium text-gray-700">DNA Sequence</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter DNA sequence or FASTA format..."
                                    className="h-32 font-mono rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Window Size Field */}
                <FormField
                    control={form.control}
                    name="window_size"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="window_size" className="text-lg font-medium text-gray-700">Window Size</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                    min={1}
                                    className="rounded border-2 border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 text-white rounded hover:bg-primary-700 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze Sequence"}
                </Button>
            </form>
        </Form>
    );
}
