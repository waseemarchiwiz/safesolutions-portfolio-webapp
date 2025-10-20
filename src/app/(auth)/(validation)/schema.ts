import { z } from "zod";

// Validation Schema
export const signInSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().min(6, "minimum 6 characters"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
