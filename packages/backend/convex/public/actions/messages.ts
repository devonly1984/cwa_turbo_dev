import { components, internal } from "@workspace/backend/_generated/api.js";
import { action } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { ConvexError, v } from "convex/values";
import { resolveConversation } from "@workspace/backend/system/ai/tools/resolveConversation.js";
import { escalateConversation } from "@workspace/backend/system/ai/tools/escalateConversation.js";
import { saveMessage } from "@convex-dev/agent";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
  
  },
  handler: async (ctx, args) => {
  const { orgId } = await getIdentity(ctx);
    const conversation = await ctx.runQuery(
      internal.system.queries.conversations.getByThreadId,
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
const shouldTriggerAgent = conversation.status === "unresolved";
if (shouldTriggerAgent) {
    await supportAgent.generateText(
      ctx,
     
      {
        threadId: args.threadId,
      },
      {
        prompt: args.prompt,
        tools: {
          resolveConversation,
          escalateConversation,
        },
      }
    );} else {
      await saveMessage(ctx,components.agent, {
        threadId: args.threadId,
        prompt: args.prompt,
      });
    }
  },
});