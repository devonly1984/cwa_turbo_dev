import { query } from "@workspace/backend/_generated/server.js";
import { validateSession } from "@workspace/backend/lib/convexUtils.js";
import { v } from "convex/values";

export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { contactSessionId, conversationId }) => {
    const session = await validateSession(ctx, contactSessionId);
    const conversation = await ctx.db.get(conversationId);
    if (!conversation) {
        return null;
    }

    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});