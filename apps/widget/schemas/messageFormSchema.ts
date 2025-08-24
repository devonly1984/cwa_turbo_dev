import {z} from 'zod';


export const messageFormSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
});

export type MessageFormSchema = z.infer<typeof messageFormSchema>