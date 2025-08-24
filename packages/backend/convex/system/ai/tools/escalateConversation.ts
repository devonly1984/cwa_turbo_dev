import { createTool } from "@convex-dev/agent";
import z from 'zod';
import { internal } from "@workspace/backend/convex/_generated/api.js";
import { supportAgent } from "../agents/supportAgent.js"


export const escalateConversation = createTool({
    description: "Escalate a conversation",
    args: z.object({}),
    handler: async(ctx)=>{
        if (!ctx.threadId) {
            return "Missing Thread ID";
        }
        await ctx.runMutation(
          internal.system.mutations.conversations.escalate,
          {
            threadId: ctx.threadId,
          }
        );
        await supportAgent.saveMessage(ctx, {
          threadId: ctx.threadId,
          message: {
            role: "assistant",
            content: "Conversation Escalated to a human operator",
          },
        });
        return "Conversation Escalated to a human operator";
    }

})