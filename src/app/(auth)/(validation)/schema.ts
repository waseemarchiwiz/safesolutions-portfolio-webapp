import { z } from "zod";

// Sign-in schema
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// Sign-up schema
export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((v) => /[A-Z]/.test(v), {
      message: "Must contain at least one uppercase letter",
    })
    .refine((v) => /[0-9]/.test(v), {
      message: "Must contain at least one number",
    }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
