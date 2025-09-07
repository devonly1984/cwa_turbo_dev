import { z } from "zod";

export const widgetFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  
});

export type WidgetFormSchema = z.infer<typeof widgetFormSchema>;