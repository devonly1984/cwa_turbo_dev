import { internal } from "@workspace/backend/_generated/api.js";
import { action } from "@workspace/backend/_generated/server.js";
import { supportAgent } from "@workspace/backend/system/ai/supportAgent.js";
import { ConvexError, v } from "convex/values";
export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { prompt, threadId, contactSessionId }) => {
    const contactSession = await ctx.runQuery(
      internal.system.queries.contactSessions.getOne,
      {
        contactSessionId,
      }
    );
    if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Session",
      });
    }
    const conversation = await ctx.runQuery(
      internal.system.queries.conversations.getByThreadId,
      { threadId }
    );
    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if (conversation.status === "resolved") {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved",
      });
    }
    //TODO: Implement Subscription check
    await supportAgent.generateText(
      ctx,
      {
        threadId,
      },
      { prompt }
    );
  },
});
