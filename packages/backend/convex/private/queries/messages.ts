import { query } from "@workspace/backend/_generated/server.js";
import { getIdentity, validateSession } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentity(ctx);
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();
if (!conversation) {
  throw new ConvexError({
    code: "NOT_FOUND",
    message: "Conversation not found",
  });
}
if (conversation.organizationId!==orgId) {
  throw new ConvexError({
    code: "UNAUTHORIZED",
    message: "Invalid Organization",
  });
}

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });
    return paginated;
  },
});