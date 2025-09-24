import { z } from "zod";

export const TestimonialsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  designation: z
    .string()
    .min(2, "Designation must be at least 2 characters")
    .max(100),
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

export type TestimonialsFormValues = z.infer<typeof TestimonialsSchema>;
