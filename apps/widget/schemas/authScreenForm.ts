import { z } from "zod";

export const authScreenSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type AuthScreenSchema = z.infer<typeof authScreenSchema>;