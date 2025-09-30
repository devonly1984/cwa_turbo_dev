import { mutation } from "@workspace/backend/_generated/server.js";
import { getIdentity, validateConversation } from "@workspace/backend/lib/convexUtils.js";
import {  ConvexError, v } from "convex/values";

export const updateStatus = mutation({
  args: {
    conversationId: v.id("conversations"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("escalated"),
      v.literal("resolved")
    ),
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentity(ctx);
    const conversation = await validateConversation(
      ctx,
      orgId,
      args.conversationId
    );
    if (conversation.organizationId!==orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization Id",
      });
    }
    await ctx.db.patch(args.conversationId, {
      status: args.status,
    });
    }

  
});