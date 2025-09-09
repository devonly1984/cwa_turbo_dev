import { query } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/supportAgent.js";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
   
  },
  handler: async (
    ctx,
    { threadId, paginationOpts,  }
  ) => {
    const { orgId } = await getIdentity(ctx);
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", threadId))
      .unique();
      if (!conversation) {
        throw new ConvexError({
          code: "NOT_FOUND",
          mesage: "Conversation not found"
        })
      }
      if (conversation.organizationId!==orgId){
        throw new ConvexError({
          code: "UNAUTHORIZED",
          mesage: "Invalid Organization Id",
        });
      }
      

    const paginated = await supportAgent.listMessages(ctx,{
        threadId,
        paginationOpts
    })
    return paginated;
  },
});