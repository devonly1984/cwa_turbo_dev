import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server.js";
import { components, internal } from "../../_generated/api.js";
import { supportAgent } from "../../system/ai/agents/supportAgent.js";
import { resolveConversation } from "../../system/ai/tools/resolveConservationTool.js";
import { escalateConversation } from "../../system/ai/tools/escalateConversation.js";
import { saveMessage } from "@convex-dev/agent";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx,{threadId,prompt,contactSessionId}) => {
    const contactSession = await ctx.runQuery(
      internal.system.queries.contactSessions.getOne,
      {
        contactSessionId
      }
    );
    if (!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    const conversation = await ctx.runQuery(
      internal.system.queries.conversations.getThreadById,
      {
        threadId
      }
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
        mesasge: "Conversation resolved",
      });
    }
    const shouldTriggerAgent = conversation.status==='unresolved'
    //TODO: Subscription check
    if (shouldTriggerAgent) {
    await supportAgent.generateText(
      ctx,
      {
        threadId,
      },
      {
        prompt,
        tools: {
          resolveConversation,
          escalateConversation,
        },
      }
    );
  } else {
    await saveMessage(ctx, components.agent, {
      threadId,
      prompt,
    });
  }
  },
});