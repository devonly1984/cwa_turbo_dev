
import { contentHashFromArrayBuffer,  } from "@convex-dev/rag";
import { action,  } from "@workspace/backend/_generated/server.js";
import {  getIdentity, guessMimeType } from "@workspace/backend/lib/convexUtils.js";
import { extractTextContent } from "@workspace/backend/lib/extractors.js";
import rag from "@workspace/backend/system/ai/rag.js";
import { EntryMetadata } from "@workspace/backend/types/index.js";
import { v } from "convex/values";


export const addFile = action({
  args: {
    filename: v.string(),
    mimeType: v.string(),
    bytes: v.bytes(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentity(ctx);
    const { bytes, filename, category } = args;
   
    let mimeType;
    if (!args.mimeType) {
      mimeType = guessMimeType(filename,bytes);
    } else {
      mimeType = args.mimeType
    }
    const blob = new Blob([bytes], { type: mimeType });
    const storageId = await ctx.storage.store(blob);
    const text = await extractTextContent(ctx, {
      storageId,
      filename,
      bytes,
      mimeType,
    });
    const { entryId, created } = await rag.add(ctx, {
      namespace: orgId,
      text,
      key: filename,
      title: filename,
      metadata: {
        storageId,
        uploadedBy: orgId,
        filename,
        category: category ?? null,
      } as EntryMetadata,
      contentHash: await contentHashFromArrayBuffer(bytes),
    });
    if (!created) {
      console.log("Entry already exists, skipping upload metadata");
      await ctx.storage.delete(storageId);
    }
    return {
      url: await ctx.storage.getUrl(storageId),
      entryId,
    };
  },
});
