import { internalQuery } from "@workspace/backend/_generated/server.js";
import { v } from "convex/values";

export const getByThreadId = internalQuery({
  args: {
    threadId: v.string()
  },
  handler: async (ctx, {threadId}) => {
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", threadId))
      .unique();
      return conversation;
  },
});