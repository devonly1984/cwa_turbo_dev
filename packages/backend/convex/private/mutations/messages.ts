import { saveMessage } from "@convex-dev/agent";
import { components, internal } from "@workspace/backend/_generated/api.js";
import {  mutation } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/supportAgent.js";
import { ConvexError, v } from "convex/values";


export const create = mutation({
  args: {
    prompt: v.string(),
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { prompt, conversationId}) => {
  const { orgId } = await getIdentity(ctx);
    const conversation = await ctx.db.get(conversationId);


    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if (conversation.organizationId!==orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization Id",
      });
    }

    if (conversation.status === "resolved") {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved",
      });
    }

    //TODO: Implement Subscription check
    await saveMessage(ctx, components.agent, {
      threadId: conversation.threadId,
      //TODO:AGENT NAME needed?
      agentName: "TEst",
      message: {
        role: "assistant",
        content: prompt,
      },
    });
  },
});
