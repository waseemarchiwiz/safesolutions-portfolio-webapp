// src/app/admin/add-job/(validation)/validation.ts
import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 3 characters")
    .max(200),
  email: z.string().pipe(z.email("invalid email format")),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
