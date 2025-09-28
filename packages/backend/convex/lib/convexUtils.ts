import { ConvexError } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server.js";
import { Id } from "../_generated/dataModel.js";

export const getIdentity = async (
  ctx: QueryCtx | MutationCtx | ActionCtx
) => {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Not Logged In",
    });
  }

  const orgId = (await identity.orgId) as string;
  if (!orgId) {
    throw new ConvexError({
      code: "Not Found",
      message: "Organization Id not found",
    });
  }
  return { orgId };
};

export const validateSession = async (
  ctx: QueryCtx | MutationCtx,
  contactSessionId: Id<"contactSessions">
) => {
  const session = await ctx.db.get(contactSessionId);
  if (!session || session.expiresAt < Date.now()) {
    throw new ConvexError({
      code: "UNAUTHROIZED",
      message: "Invalid Session",
    });
  }
  return session;
};
export const validateConversation = async(ctx:QueryCtx|MutationCtx,orgId:string,conversationId:Id<'conversations'>)=>{
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
          message: "Invalid organization Id",
        });
      }
      return conversation;

}