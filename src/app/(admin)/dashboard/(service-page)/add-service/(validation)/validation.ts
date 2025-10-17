import { z } from "zod";

export const buildServiceSchema = (isEdit: boolean) =>
  z.object({
    slug: z
      .string()
      .min(2, "Slug must be at least 2 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase with hyphens only"
      ),
    title: z.string().min(2, "Title must be at least 2 characters").max(100),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000),

    features: z.array(z.string()).optional(),
    link: z.string().url("Invalid URL").optional().or(z.literal("")),
    overview: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    industries: z.array(z.string()).optional(),
    useCases: z.array(z.string()).optional(),

    // Image validation
    image: isEdit
      ? z
          .union([
            z
              .instanceof(File)
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
              ),
            z.string().min(1), // Existing image URL
            z.undefined(),
          ])
          .optional()
      : z
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

export type AddServiceFormValues = z.infer<
  ReturnType<typeof buildServiceSchema>
>;
