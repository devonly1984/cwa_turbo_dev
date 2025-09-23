import z from "zod";

export const chatScreenFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type ChatScreenFormSchema = z.infer<typeof chatScreenFormSchema>;