import { ConvexError } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server.js";
import { Id } from "../_generated/dataModel.js";

export const getIdentity = async (
  ctx: ActionCtx | QueryCtx | MutationCtx
) => {
  const identity = await ctx.auth.getUserIdentity();

  if (identity === null) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Not Authenticated",
    });
  }
  const orgId = identity.orgId as string;
  if (!orgId) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "Organization Id not found",
    });
  }
  return { orgId };
};
export const getSession = async (
  ctx:  QueryCtx ,
  contactSessionId: Id<"contactSessions">
) => {
      const session = await ctx.db.get(contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });
    }
    return session;
};