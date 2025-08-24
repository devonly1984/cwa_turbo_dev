import { createTool } from "@convex-dev/agent";
import z from 'zod';
import { internal } from "@workspace/backend/convex/_generated/api.js";
import { supportAgent } from "../agents/supportAgent.js"


export const resolveConversation = createTool({
    description: "Resolve a conversation",
    args: z.object({}),
    handler: async(ctx)=>{
        if (!ctx.threadId) {
            return "Missing Thread ID";
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
            content: "Conversation Resolved",
          },
        });
        return "Conversation Resolved";
    }

})