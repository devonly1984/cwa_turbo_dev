import { query } from "@workspace/backend/_generated/server.js";
import { supportAgent } from "@workspace/backend/system/ai/supportAgent.js";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (
    ctx,
    { threadId, paginationOpts, contactSessionId }
  ) => {
    const contactSession = await ctx.db.get(contactSessionId);
    if (!contactSession || contactSession.expiresAt<Date.now()) {
        throw new ConvexError({
          code: "BAD_REQUEST",
          message: "Invalid or expired session",
        });
    }
    const paginated = await supportAgent.listMessages(ctx,{
        threadId,
        paginationOpts
    })
    return paginated;
  },
});