import { paginationOptsValidator } from "convex/server";
import { query } from "../../_generated/server.js";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../../system/ai/agents/supportAgent.js";
import { getIdentify } from "../../lib/convexUtils.js";

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
   
  },
  handler: async (ctx, {threadId,paginationOpts}) => {
    const { orgId } = await getIdentify(ctx);
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", threadId))
      .unique();

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Thread not found",
      });
    }
    if (conversation.organizationId !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization Id",
      });
    }
    const paginated = await supportAgent.listMessages(ctx, {
      threadId,
      paginationOpts,
    });

    return paginated;
  },
});