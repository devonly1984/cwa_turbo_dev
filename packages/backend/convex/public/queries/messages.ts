import { query } from "@workspace/backend/_generated/server.js";
import { validateSession } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    contactSessionId: v.id('contactSessions')
  },
  handler: async (ctx, args) => {
    const session = await validateSession(ctx, args.contactSessionId);
    if (!session || session.expiresAt<Date.now()) {
        throw new ConvexError({
          code: "BAD_REQUEST",
          message: "Invalid expired session",
        });
    }
 const paginated = await supportAgent.listMessages(ctx, {
   threadId: args.threadId,
   paginationOpts: args.paginationOpts,
 });
    return paginated;
  },
});