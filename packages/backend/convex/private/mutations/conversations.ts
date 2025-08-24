import { ConvexError, v } from "convex/values";
import { mutation } from "../../_generated/server.js";
import { getIdentify } from "../../lib/convexUtils.js";

export const updateStatus = mutation({
  args: {
    conversationId: v.id("conversations"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("escalated"),
      v.literal("resolved")
    ),
  },
  handler: async (ctx, { conversationId, status }) => {
    const { orgId } = await getIdentify(ctx);
    const conversation = await ctx.db.get(conversationId);
    if (!conversation) {
        throw new ConvexError({
            code: "NOT_FOUND",
            message: "Conversation not found"
        })
    }
    if (conversation.organizationId!==orgId) {
        throw new ConvexError({
            code: "UNAUTHORIZED",
            message: "Invalid Organization Id"
        })
    }
    await ctx.db.patch(conversationId, {
      status,
    });
  },
});