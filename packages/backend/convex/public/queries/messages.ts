import { paginationOptsValidator } from "convex/server";
import { query } from "../../_generated/server.js";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../../system/ai/agents/supportAgent.js";

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(args.contactSessionId);

    if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired session",
      });
    }
    
    const paginated = await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });
    return paginated;
  },
});