import { openai } from "@ai-sdk/openai";


export const SESSION_DURATION = 24 * 60 * 60 * 1000;
export const AI_MODELS: any = {
  image: openai.chat("gpt-4o-mini"),
  pdf: openai.chat("gpt-4o"),
  html: openai.chat("gpt-4o"),
} as const;

export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const SYSTEM_PROMPTS = {
  image:
    "You turn images into text. If it is a photo of a document, transcribe it. If it is not a document, describe it.",
  pdf: "You transform PDF files into text. ",
  html: "You transform content into markdown.",
};

export const KILOBYTE=1024;
export const FILE_SIZES = ["B", "KB", "MB", "GB"];

