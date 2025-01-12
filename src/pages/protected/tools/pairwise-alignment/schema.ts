import { z } from "zod";

export const alignmentFormSchema = z.object({
  sequence1: z
    .string()
    .min(1, "First sequence is required")
    .refine(
      (val) => /^[ATCG]+$/i.test(val),
      "Sequence must only contain A, T, C, or G characters"
    ),
  sequence2: z
    .string()
    .min(1, "Second sequence is required")
    .refine(
      (val) => /^[ATCG]+$/i.test(val),
      "Sequence must only contain A, T, C, or G characters"
    ),
  alignment_type: z.enum(["Global_Alignment", "Local_Alignment"]),
});

export type AlignmentFormValues = z.infer<typeof alignmentFormSchema>;