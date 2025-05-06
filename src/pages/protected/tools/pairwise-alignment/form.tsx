import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GitCompareArrows } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { AlignmentFormProps } from './types';
import { alignmentFormSchema, AlignmentFormValues } from './schema';

export const AlignmentForm: React.FC<AlignmentFormProps> = ({ onSubmit, loading }) => {
    const form = useForm<AlignmentFormValues>({
        resolver: zodResolver(alignmentFormSchema),
        defaultValues: {
            sequence1: 'ATGCCATGCTAGCTAGCTAG',
            sequence2: 'CGATCGATCGATCGATCGAT',
            alignment_type: 'Global_Alignment',
        },
    });

    const handleSubmit = async (values: AlignmentFormValues) => {
        await onSubmit(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid gap-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="sequence1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First DNA Sequence</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your first DNA sequence (e.g., ATCG)"
                                            className="font-mono h-24 rounded-sm !outline-none !ring-0 !shadow-none"
                                            autoFocus
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sequence2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Second DNA Sequence</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your second DNA sequence (e.g., GCTA)"
                                            className="font-mono h-24 rounded-sm !outline-none !ring-0 !shadow-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="alignment_type"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Alignment Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FormControl>
                                                <RadioGroupItem value="Global_Alignment" id="global" />
                                            </FormControl>
                                            <Label htmlFor="global">Global Alignment</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FormControl>
                                                <RadioGroupItem value="Local_Alignment" id="local" />
                                            </FormControl>
                                            <Label htmlFor="local">Local Alignment</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full rounded shadow-none bg-primary text-white"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Processing...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <GitCompareArrows className="h-5 w-5" />
                            Align Sequences
                        </div>
                    )}
                </Button>
            </form>
        </Form>
    );
};