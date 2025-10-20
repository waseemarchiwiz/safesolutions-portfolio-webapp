import { z } from "zod";

export const EditTestimonialsSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  designation: z.string().min(2).max(100),
  description: z.string().min(10),
  image: z
    .union([z.instanceof(File), z.string().min(1), z.literal(null)])
    .optional(),
});

export type EditTestimonialsFormValues = z.infer<typeof EditTestimonialsSchema>;
