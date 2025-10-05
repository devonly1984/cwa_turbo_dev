import { vEntryId } from "@convex-dev/rag";
import { Id } from "@workspace/backend/_generated/dataModel.js";
import { mutation } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import rag from "@workspace/backend/system/ai/rag.js";
import { ConvexError } from "convex/values";

export const deleteFile = mutation({
  args: {
    entryId: vEntryId,

  },
  handler: async(ctx,args)=>{
    const { orgId } = await getIdentity(ctx);
    const namespace = await rag.getNamespace(ctx, {
      namespace: orgId,
    });
    if (!namespace) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid namespace",
      });
    }
    const entry = await rag.getEntry(ctx, { entryId: args.entryId });
    if (!entry) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Entry not found",
      });
    }
    if (entry.metadata?.uploadedBy !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization Id",
      });
    }
    if (entry.metadata?.storageId) {
        await ctx.storage.delete(
          entry.metadata.storageId as Id<"_storage">
        );
    }
    await rag.deleteAsync(ctx, {
      entryId: args.entryId,
    });
  }
})