import { createTool } from "@convex-dev/agent";
import z from "zod";
import { internal } from "@workspace/backend/_generated/api.js";
import { supportAgent } from "../agents/supportAgent.js";

export const escalateConversation: any = createTool({
  description: "Escalate a conversation",
  args: z.object({}),
  handler: async (ctx) => {
    if (!ctx.threadId) {
      return "Missing thread Id";
    }
    await ctx.runMutation(
      internal.system.mutations.conversations.resolve,
      {
        threadId: ctx.threadId,
      }
    );
    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: "Conversation Escalated",
      },
    });
    return "Conversation Escalated";
  },
});