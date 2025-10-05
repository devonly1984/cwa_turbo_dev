import { query } from "@workspace/backend/_generated/server.js";
import { convertEntryToPublicFile, getIdentity } from "@workspace/backend/lib/convexUtils.js";
import rag from "@workspace/backend/system/ai/rag.js";
import { paginationOptsValidator } from "convex/server";
import {  v } from "convex/values";

export const listFiles = query({
  args: {
    category: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentity(ctx);
    const namespace = await rag.getNamespace(ctx, {
      namespace: orgId,
    });

     if (!namespace) {
       return { page: [], isDone: true, continueCursor: "" };
    }
    const results = await rag.list(ctx, {
      namespaceId: namespace?.namespaceId,
      paginationOpts: args.paginationOpts,
    });
  
    const files = await Promise.all(
      results.page.map((entry) => convertEntryToPublicFile(ctx, entry))
    );
 
    const filteredFiles = args.category
      ? files.filter((file) => file.category === args.category)
      : files;

    return {
      page: filteredFiles,
      isDone: results.isDone,
      continueCursor: results.continueCursor,
    };
  },
});