import { z } from "zod";

export const buildServiceSchema = (isEdit: boolean) =>
  z.object({
    tab: z.string().min(2, "Tab must be at least 2 characters").max(50),
    title: z.string().min(2, "Title must be at least 2 characters").max(100),
    icon: z.string().optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000),

    // Arrays instead of comma-separated strings
    features: z.array(z.string()).optional(),
    link: z.string().url("Invalid URL").optional(),
    overview: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    industries: z.array(z.string()).optional(),
    useCases: z.array(z.string()).optional(),

    // Logo/Image upload
    image: isEdit
      ? z.instanceof(File).optional()
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
          )
          .optional(),
  });

export type AddServiceFormValues = z.infer<
  ReturnType<typeof buildServiceSchema>
>;
