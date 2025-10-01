import { z } from "zod";

// Validation Schema
export const contactSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message should be at least 5 characters"),
  sender_email: z.string().min(1, "Please select a recipient email"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
