import { ConvexError } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server.js";

export const getIdentity = async(ctx:QueryCtx|MutationCtx|ActionCtx)=>{
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Not Logged In",
      });
    }

    const orgId = await identity.orgId as string;
    if (!orgId) {
        throw new ConvexError({
          code: "Not Found",
          message: "Organization Id not found",
        });
    }
    return { orgId };
}