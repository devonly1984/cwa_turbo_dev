import { z } from "zod";

export const widgetChatFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type WidgetChatFormSchema = z.infer<typeof widgetChatFormSchema>;