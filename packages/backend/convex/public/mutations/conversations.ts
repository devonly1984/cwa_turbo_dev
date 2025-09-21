import { mutation } from "@workspace/backend/_generated/server.js";
import { validateSession } from "@workspace/backend/lib/convexUtils.js";
import { ConvexError, v } from "convex/values";

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { organizationId, contactSessionId }) => {
 const session = await validateSession(ctx,contactSessionId)
    let threadId="123"
    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "unresolved",
      organizationId,
      threadId,
    });
    return conversationId
  },
});