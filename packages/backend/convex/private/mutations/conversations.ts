import { mutation } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { ConvexError, v } from "convex/values";

export const updateStatus = mutation({
  args: {
    conversationId: v.id("conversations"),
    status: v.union(
      v.literal("unresolved"),
      v.literal("escalated"),
      v.literal("resolved")
    ),
  },
  handler: async (ctx, {conversationId,status}) => {
    const { orgId } = await getIdentity(ctx);
    const conversation = await ctx.db.get(conversationId);
    if (!conversation) {
        throw new ConvexError({
          code: "NOT_FOUND",
          message: "Conversation not found",
        });
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