// Fixed validation schema - (validation)/validation.ts
import { z } from "zod";

export const addBlogSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500),

  content: z.string().min(1, "Content is required"),
  images: z
    .array(
      z

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
        )
    )
    .min(1, "At least one image is required")
    .max(5, "Only Five images are allowed"),
});

export type AddBlogFormValues = z.infer<typeof addBlogSchema>;
