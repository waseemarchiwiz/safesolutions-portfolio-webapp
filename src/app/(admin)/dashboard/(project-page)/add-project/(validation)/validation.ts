import { z } from "zod";

// Service inside Project
const serviceSchema = z.object({
  title: z.string().min(2, "Service title must be at least 2 characters"),
  description: z
    .string()
    .min(5, "Service description must be at least 5 characters"),
  features: z.array(z.string()).optional(),
  icon: z.string().min(1, "Icon is required"),
});

// Project Detail inside Project
// Project Detail inside Project
const projectDetailSchema = z.object({
  name: z.string().min(2, "Detail name is required"),
  deploymentType: z.string().min(2, "Deployment type is required"),
});

// Support inside Project
const supportSchema = z.object({
  title: z.string().min(2, "Support title must be at least 2 characters"),
  description: z
    .string()
    .min(5, "Support description must be at least 5 characters"),
  icon: z.string().min(1, "Icon is required"),
});

export const buildProjectSchema = (isEdit: boolean) =>
  z.object({
    name: z.string().min(2, "Project name must be at least 2 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    version: z.string().optional(),
    lastUpdated: z.string().optional(),
    type: z.enum(["detailed", "external"]),
    link: z.string().url("Invalid URL").optional(),

    services: z.array(serviceSchema).optional(),
    projectDetails: z.array(projectDetailSchema).optional(),
    supports: z.array(supportSchema).optional(),

    // Image upload
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
          ),
  });

export type AddProjectFormValues = z.infer<
  ReturnType<typeof buildProjectSchema>
>;
