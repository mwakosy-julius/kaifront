import { z } from "zod";

export const gcContentSchema = z.object({
    sequence: z.string().min(1, "Sequence is required"),
    window_size: z.number().min(1, "Window size must be at least 1")
});

export type GCContentRequest = z.infer<typeof gcContentSchema>;

export interface NucleotideCount {
    count: number;
    percentage: number;
}

export interface GCContentResponse {
    total_length: number;
    nucleotides: {
        A: NucleotideCount;
        T: NucleotideCount;
        G: NucleotideCount;
        C: NucleotideCount;
    };
    gc_content: number[];
    positions: number[];
    plot_data: string;
}