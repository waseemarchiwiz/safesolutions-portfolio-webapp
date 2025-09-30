import { z } from "zod";

// Schema that accepts File OR string path
export const EditBuildTeamSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
  image: z
    .union([z.instanceof(File), z.string().min(1), z.literal(null)])
    .optional(),
});

export type EditTeamFormValues = z.infer<typeof EditBuildTeamSchema>;
