import { z } from "zod";

export const EditBuildTeamSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role must be at least 2 characters").max(100),
  githubUrl: z.string().url("Invalid GitHub URL").optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional(),
  twitterUrl: z.string().url("Invalid Twitter URL").optional(),
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
    )
    .optional(),
});

export type EditTeamFormValues = z.infer<typeof EditBuildTeamSchema>;
