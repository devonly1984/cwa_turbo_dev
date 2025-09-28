import { MessageDoc } from "@convex-dev/agent";
import { Doc } from "@workspace/backend/_generated/dataModel.js";
import { query } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
import { paginationOptsValidator, PaginationResult } from "convex/server";
import { ConvexError, v } from "convex/values";
export const getOne = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, {conversationId}) => {
    const { orgId } = await getIdentity(ctx);
    const conversation = await ctx.db.get(conversationId);

    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if (conversation.organizationId !==orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid Organization ID"
      })
    }
    const contactSession = await ctx.db.get(conversation.contactSessionId);
    if (!contactSession) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Contact session not found",
      });
    }
    return {
      ...conversation,
      contactSession,
    };
  },
});
export const getMany = query({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(
      v.union(
        v.literal("unresolved"),
        v.literal("escalated"),
        v.literal("resolved")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentity(ctx);
    let conversations: PaginationResult<Doc<"conversations">>;
    if (args.status) {
      conversations = await ctx.db
        .query("conversations")
        .withIndex("by_status_and_organization_id", (q) =>
          q
            .eq("status", args.status as Doc<"conversations">["status"])
            .eq("organizationId", orgId)
        )
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      conversations = await ctx.db
        .query("conversations")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", orgId)
        )
        .order("desc")
        .paginate(args.paginationOpts);
    }
    const conversationsWithAdditionalData = await Promise.all(
      conversations.page.map(async (conversation) => {
        let lastMessage: MessageDoc | null = null;
        const contactSession = await ctx.db.get(
          conversation.contactSessionId
        );
        if (!contactSession) {
          return null;
        }
        const messages = await supportAgent.listMessages(ctx, {
          threadId: conversation.threadId,
          paginationOpts: { numItems: 1, cursor: null },
        });
        if (messages.page.length > 0) {
          lastMessage = messages.page[0] ?? null;
        }
        return {
          ...conversation,
          lastMessage,
          contactSession,
        };
      })
    );
    const validConversations = conversationsWithAdditionalData.filter(
      (conv): conv is NonNullable<typeof conv> => conv !== null
    );
    return {
      ...conversations,
      page: validConversations,
    };
  },
});
