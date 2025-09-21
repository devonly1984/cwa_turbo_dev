import z from "zod";

export const chatFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type ChatFormSchema = z.infer<typeof chatFormSchema>;