// src/app/admin/add-job/(validation)/validation.ts
import { z } from "zod";

export const buildJobSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  shortDescription: z
    .string()
    .min(5, "Short description must be at least 5 characters")
    .max(255),
  easyApply: z.string().min(1, "Enter url"),
});

export type JobFormValues = z.infer<typeof buildJobSchema>;
