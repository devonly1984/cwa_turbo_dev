import { internal } from "@workspace/backend/_generated/api.js";
import { action } from "@workspace/backend/_generated/server.js";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
import { ConvexError, v } from "convex/values";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.runQuery(
      internal.system.contactSessions.getOne,
      {
        contactSessionId: args.contactSessionId,
      }
    );
    if (!contactSession || contactSession.expiresAt<Date.now()) {
        throw new ConvexError({
            code: "UNAUTHORIZED",
            message: "invalid session"
        })
    }
    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      {
        threadId: args.threadId,
      }
    );
    if (!conversation) {
        throw new ConvexError({
          code: "NOT_FOUND",
          message: "Conversation not found",
        });
    }
    if (conversation.status==='resolved') {
        throw new ConvexError({
          code: "BAD_REQUEST",
          message: "Conversation already resolved",
        });
    }
    //TODO: implement subscription check

    await supportAgent.generateText(
      ctx,
      {
        threadId: args.threadId,
      },
      {
        prompt: args.prompt,
      }
    );
  },
});