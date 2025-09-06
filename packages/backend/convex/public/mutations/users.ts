import { v } from "convex/values";
import { mutation } from "../../_generated/server.js";
import { getIdentity } from "../../lib/convexUtils.js";

export const add = mutation({
  args: {
    
  },
  handler: async (ctx, ) => {
    const { orgId } = await getIdentity(ctx);
    await ctx.db.insert("users", {
      name: "Steve",
    });
  },
});