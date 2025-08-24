import { z } from "zod";

export const converationIdSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type ConversationIdSchema = z.infer<typeof converationIdSchema>;