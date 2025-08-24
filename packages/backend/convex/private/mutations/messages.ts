import { ConvexError, v } from "convex/values";
import {  mutation } from "../../_generated/server.js";
import { components,  } from "../../_generated/api.js";

import { getIdentify } from "../../lib/convexUtils.js";
import { saveMessage } from "@convex-dev/agent";

export const create = mutation({
  args: {
    prompt: v.string(),
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, {prompt,conversationId}) => {
    const { orgId } = await getIdentify(ctx);
    const conversation = await ctx.db.get(conversationId);

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if (conversation.organizationId!==orgId){
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization Id"
      })
    }
    if (conversation.status==='resolved') {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation Resolved",
      });
    }

await saveMessage(ctx, components.agent, {
  threadId: conversation.threadId,
  //agentName: "",
  message: {
    role: "assistant",
    content: prompt,
  },
});

    
  },
});