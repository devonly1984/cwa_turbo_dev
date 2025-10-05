import { EntryId } from "@convex-dev/rag";
import { Id } from "../_generated/dataModel.js";
export type ExtractTextContentArgs = {
  storageId: Id<"_storage">;
  filename: string;
  bytes?: ArrayBuffer;
  mimeType: string;
};
export type PublicFile = {
  id: EntryId;
  name: string;
  type: string;
  size: string;
  status: "ready" | "processing" | "error";
  url: string | null;
  category?: string;
};

export type EntryMetadata = {
  storageId: Id<"_storage">;
  uploadedBy: string;
  filename: string;
  category: string | null;
};