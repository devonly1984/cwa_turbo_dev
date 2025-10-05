import { StorageActionWriter } from "convex/server";
import { AI_MODELS,  SUPPORTED_IMAGE_TYPES, SYSTEM_PROMPTS } from "../constants/index.js";
import { ExtractTextContentArgs } from "../types/index.js";
import { generateText } from "ai";
import { assert } from "convex-helpers";
import { Id } from "../_generated/dataModel.js";

export const extractTextContent = async (
  ctx: { storage: StorageActionWriter },
  args: ExtractTextContentArgs
): Promise<string> => {
  const { storageId, filename, bytes, mimeType } = args;
  const url = await ctx.storage.getUrl(storageId);
  assert(url, "Failed to get storage url");
  if (SUPPORTED_IMAGE_TYPES.some((type) => type === mimeType)) {
    return extractImageText(url);
  }
  if (mimeType.toLowerCase().includes("pdf")) {
    return extractPdfText(url, mimeType, filename);
  }
  if (mimeType.toLowerCase().includes("text")) {
    return extractTextFileContent(ctx, storageId, bytes, mimeType);
  }
  throw new Error(`Unsupported MIME type: ${mimeType}`);
};
export const extractImageText = async (url: string): Promise<string> => {
  const result = await generateText({
    model: AI_MODELS.image,
    system: SYSTEM_PROMPTS.image,
    messages: [
      {
        role: "user",
        content: [{ type: "image", image: new URL(url) }],
      },
    ],
  });
  return result.text;
};
export const extractPdfText = async (
  url: string,
  mimeType: string,
  filename: string
): Promise<string> => {
  const result = await generateText({
    model: AI_MODELS.pdf,
    system: SYSTEM_PROMPTS.pdf,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: new URL(url),
            mediaType: mimeType,
            filename,
          },
          {
            type: "text",
            text: "Extract the text from the PDF and print it without explaining you'll do so",
          },
        ],
      },
    ],
  });
  return result.text;
};
export const extractTextFileContent = async (
  ctx: {
    storage: StorageActionWriter;
  },
  storageId: Id<"_storage">,
  bytes: ArrayBuffer | undefined,
  mimeType: string
):Promise<string> => {
    const arrayBuffer =
      bytes || (await (await ctx.storage.get(storageId))?.arrayBuffer());

   if (!arrayBuffer) {
    throw new Error("Failed to get file content");

   }
   const text = new TextDecoder().decode(arrayBuffer);
   if (mimeType.toLowerCase() !== "text/plain") {
     const result = await generateText({
       model: AI_MODELS.html,
       system: SYSTEM_PROMPTS.html,
       messages: [
         {
           role: "user",
           content: [
             { type: "text", text },
             {
               type: "text",
               text: "Extract the text and print it in a markdown format without explaining that you'll do so",
             },
           ],
         },
       ],
     });
     return result.text;
   }
   return text;
};