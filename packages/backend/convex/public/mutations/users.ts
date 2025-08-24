import { v } from "convex/values";
import { mutation } from "../../_generated/server.js"

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not Authenticated");
    }
    const orgId = identity?.orgId as string;
    if (!orgId) {
      throw new Error("Missing organization");
    }
 
    const userId = await ctx.db.insert("users", {
      name: "Test",
    });
    return userId;
  },
});
