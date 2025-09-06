import { ConvexError } from "convex/values";
import { ActionCtx, MutationCtx, QueryCtx } from "../_generated/server.js";

export const getIdentity = async(ctx:ActionCtx|QueryCtx|MutationCtx)=>{
    const identity = await ctx.auth.getUserIdentity();

    if (identity===null) {
        throw new ConvexError({
            code: "UNAUTHORIZED",
            message: "Not Authenticated"
        })
    }
}