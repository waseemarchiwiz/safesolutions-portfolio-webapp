// src/app/admin/add-job/(validation)/validation.ts
import { z } from "zod";

export const buildJobSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  shortDescription: z
    .string()
    .min(5, "Short description must be at least 5 characters")
    .max(255),
  easyApply: z.string().min(1, "Enter url"),
});

export type JobFormValues = z.infer<typeof buildJobSchema>;
