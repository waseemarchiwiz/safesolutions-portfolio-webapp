// Fixed validation schema - (validation)/validation.ts
import { z } from "zod";

export const categoryEditSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  image: z
    .union([
      z.instanceof(File), // New file upload
      z.string().url(), // Existing URL
      z.undefined(), // Optional
    ])
    .optional(),
});
export type CategoryEditFormValues = z.infer<typeof categoryEditSchema>;
