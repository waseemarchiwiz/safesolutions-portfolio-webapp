// src/app/admin/add-job/(validation)/validation.ts
import { z } from "zod";

export const FaqSchema = z.object({
  question: z
    .string()
    .min(2, "Question must be at least 10 characters")
    .max(200),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
});

export type FaqFormValues = z.infer<typeof FaqSchema>;
