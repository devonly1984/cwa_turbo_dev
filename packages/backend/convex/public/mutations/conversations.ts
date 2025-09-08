import { saveMessage } from "@convex-dev/agent";
import { components } from "@workspace/backend/_generated/api.js";
import { mutation } from "@workspace/backend/_generated/server.js";
import { getSession } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/supportAgent.js";
import { v } from "convex/values";

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, {organizationId,contactSessionId}) => {
    const session = await getSession(ctx, contactSessionId);

    const { threadId } = await supportAgent.createThread(ctx, {
      userId: organizationId,
    });
    await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        role: "assistant",
        //TODO: Widget Settings
        content: "Hello, how can I help you today?",
      },
    });

    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "unresolved",
      organizationId,
      threadId,
    });
    return conversationId;
  },
});