import z from "zod";

export const connectDialogSchema = z.object({
  publicApiKey: z
    .string()
    .min(1, { message: "Public API key is required" }),
  privateApiKey: z
    .string()
    .min(1, { message: "Private API key is required" }),
});

export type ConnectDialogSchema = z.infer<typeof connectDialogSchema>;