import { z } from "zod";

export const applicationSchema = z
  .object({
    name: z.string().min(1, "Full Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone must be a 10-digit number")
      .min(1, "Phone is required"),
    file: z.any().refine((val) => !!val, { message: "Resume is required" }),
    experience: z.string().min(1, "Experience Level is required"),
    message: z.string().min(1, "Message is required"),
    portfolioType: z.string().min(1, "Please select portfolio type"),
    portfolioUrl: z.string().url("Please enter a valid URL").optional(),
    portfolioFile: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.portfolioType === "url" && !data.portfolioUrl) {
      ctx.addIssue({
        path: ["portfolioUrl"],
        code: z.ZodIssueCode.custom,
        message: "Portfolio URL is required",
      });
    }

    if (data.portfolioType === "file" && !data.portfolioFile) {
      ctx.addIssue({
        path: ["portfolioFile"],
        code: z.ZodIssueCode.custom,
        message: "Portfolio file is required",
      });
    }
  });

export type ApplicationTypes = z.infer<typeof applicationSchema>;
