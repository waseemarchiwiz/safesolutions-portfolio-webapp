// (validation)/validation.ts
import { z } from "zod";

export const buildBlogSchema = (isEdit: boolean) =>
  z.object({
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
    content: z.string().min(1, "Content is required"),
    images: isEdit
      ? z.array(z.instanceof(File)).optional() // ✅ optional in edit
      : z
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
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                  ].includes(file.type),
                "Only JPEG, JPG, PNG, and WebP images are allowed"
              )
          )
          .min(1, "At least one image is required")
          .max(5, "Only Five images are allowed"),
  });

export type AddBlogFormValues = z.infer<ReturnType<typeof buildBlogSchema>>;
