import { internalMutation } from "@workspace/backend/_generated/server.js";
import { ConvexError, v } from "convex/values";

export const resolve = internalMutation({
    args: {
        threadId: v.string()
    },
    handler: async(ctx,args)=>{
        const conversation = await ctx.db
          .query("conversations")
          .withIndex("by_thread_id", (q) =>
            q.eq("threadId", args.threadId)
          ).unique();
          if (!conversation) {
            throw new ConvexError({
              code: "NOT_FOUND",
              message: "Conversation not found",
            });
          }
          await ctx.db.patch(conversation._id, {
            status: "resolved",
          });
    }
})
export const escalate = internalMutation({
    args: {
        threadId: v.string()
    },
    handler: async(ctx,args)=>{
        const conversation = await ctx.db
          .query("conversations")
          .withIndex("by_thread_id", (q) =>
            q.eq("threadId", args.threadId)
          ).unique();
          if (!conversation) {
            throw new ConvexError({
              code: "NOT_FOUND",
              message: "Conversation not found",
            });
          }
          await ctx.db.patch(conversation._id, {
            status: "escalated",
          });
    }
})