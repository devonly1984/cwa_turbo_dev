import { query } from "@workspace/backend/_generated/server.js";
import { getSession } from "@workspace/backend/lib/convexUtils.js";
import { ConvexError, v } from "convex/values";


export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await getSession(ctx,args.contactSessionId)
    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
        return null;
    }
    if (conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Incorrect session",
      });
    }
    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});