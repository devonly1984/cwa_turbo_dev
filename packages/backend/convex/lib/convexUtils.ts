import { ConvexError } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server.js";
import { Id } from "../_generated/dataModel.js";
import {
  Entry,
  guessMimeTypeFromContents,
  guessMimeTypeFromExtension,
} from "@convex-dev/rag";
import { EntryMetadata, PublicFile } from "../types/index.js";
import { FILE_SIZES, KILOBYTE } from "../constants/index.js";
export const formatFileSize = (bytes:number):string=>{
  if (bytes===0) {
    return "0 B";
  }
  const i = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));
  return `${Number.parseFloat((bytes / KILOBYTE ** i).toFixed(1))} ${FILE_SIZES[i]}`;

}
export const getIdentity = async (
  ctx: QueryCtx | MutationCtx | ActionCtx
) => {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Not Logged In",
    });
  }

  const orgId = (await identity.orgId) as string;
  if (!orgId) {
    throw new ConvexError({
      code: "Not Found",
      message: "Organization Id not found",
    });
  }
  return { orgId };
};

export const validateSession = async (
  ctx: QueryCtx | MutationCtx,
  contactSessionId: Id<"contactSessions">
) => {
  const session = await ctx.db.get(contactSessionId);
  if (!session || session.expiresAt < Date.now()) {
    throw new ConvexError({
      code: "UNAUTHROIZED",
      message: "Invalid Session",
    });
  }
  return session;
};
export const validateConversation = async (
  ctx: QueryCtx | MutationCtx,
  orgId: string,
  conversationId: Id<"conversations">
) => {
  const conversation = await ctx.db.get(conversationId);
  if (!conversation) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "Conversation not found",
    });
  }
  if (conversation.organizationId !== orgId) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Invalid organization Id",
    });
  }
  return conversation;
};
export const guessMimeType = (
  filename: string,
  bytes: ArrayBuffer
): string => {
  return (
    guessMimeTypeFromExtension(filename) ||
    guessMimeTypeFromContents(bytes) ||
    "application/octet-stream"
  );
};
export const convertEntryToPublicFile = async (
  ctx: QueryCtx,
  entry: Entry
): Promise<PublicFile> => {
  const metadata = entry.metadata as EntryMetadata | undefined;
  const storageId = metadata?.storageId;
  let fileSize = "unknown";
  if (storageId) {
    try {
      const storageMetaData = await ctx.db.system.get(storageId);
      if (storageMetaData) {
        fileSize = formatFileSize(storageMetaData.size);
      }
    } catch (error) {
      console.error("Failed to get storage metadata: ", error);
    }
  }
  const filename = entry.key || "unknown";
  const extension = filename.split(".").pop()?.toLowerCase() || "txt";
  let status: "ready" | "processing" | "error" = "ready";
  if (entry.status === "ready") {
    status = "ready";
  } else if (entry.status === "pending") {
    status = "processing";
  }
  const url = storageId ? await ctx.storage.getUrl(storageId) : null;
  
  return {
    id: entry.entryId,
    name: filename,
    type: extension,
    size: fileSize,
    status,
    url,
    category: metadata?.category || undefined,
  };
};
