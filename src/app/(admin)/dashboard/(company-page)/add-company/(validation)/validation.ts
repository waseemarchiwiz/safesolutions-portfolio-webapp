// src/app/admin/add-job/(validation)/validation.ts
import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 3 characters")
    .max(200),
  email: z.string().pipe(z.email("invalid email format")),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  link: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().min(10, "Minimum 10 characters are required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      "Only JPEG, JPG, PNG, and WebP images are allowed"
    ),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
