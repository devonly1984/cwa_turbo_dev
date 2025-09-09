import { z } from "zod";

export const conversationIdFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type ConversationIdFormSchema = z.infer<
  typeof conversationIdFormSchema
>;