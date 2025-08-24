import { ConvexError } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server.js";

export const getIdentify = async (
  ctx: QueryCtx | MutationCtx | ActionCtx
) => {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Identity not found",
    });
  }
  const orgId = identity.orgId as string;
  if (!orgId) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Organization not found",
    });
  }
  return { orgId };
};