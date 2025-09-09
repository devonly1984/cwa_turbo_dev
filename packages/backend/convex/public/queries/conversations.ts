import { MessageDoc } from "@convex-dev/agent";
import { query } from "@workspace/backend/_generated/server.js";
import { getSession } from "@workspace/backend/lib/convexUtils.js";
import { supportAgent } from "@workspace/backend/system/ai/supportAgent.js";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";


export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const session = await getSession(ctx,args.contactSessionId)
    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) {
        return null;
    }
    if (conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Incorrect session",
      });
    }
    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    };
  },
});

export const getMany = query({
  args: {
    contactSessionId: v.id("contactSessions"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { contactSessionId, paginationOpts }) => {
    const contactSession = await getSession(ctx, contactSessionId);
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_contact_session_id", (q) =>
        q.eq("contactSessionId", contactSessionId)
      )
      .order("desc")
      .paginate(paginationOpts);

      const conversationsWithLastMessage = await Promise.all(
        conversations.page.map(async(conversation)=>{
          let lastMessage: MessageDoc | null = null;
          const messages = await supportAgent.listMessages(ctx,{
            threadId: conversation.threadId,
            paginationOpts: {numItems:1,cursor:null}
          })
          if (messages.page.length >0) {
            lastMessage = messages.page[0] ?? null;
          }
          return {
            _id: conversation._id,
            _creationTime: conversation._creationTime,
            status: conversation.status,
            organizationId: conversation.organizationId,
            threadId: conversation.threadId,
            lastMessage,
          };
        })
      )
      return {
        ...conversations,
        page: conversationsWithLastMessage,
      };
  }
  ,
});