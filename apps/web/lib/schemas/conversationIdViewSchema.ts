import { z } from "zod";

export const conversationIdViewSchema = z.object({
  message: z.string().min(1, "Message is required"),
});
export type ConversationIdViewSchema = z.infer<
  typeof conversationIdViewSchema
>;