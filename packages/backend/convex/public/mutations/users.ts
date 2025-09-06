import { v } from "convex/values";
import { mutation } from "../../_generated/server.js";

export const add = mutation({
  args: {
    
  },
  handler: async (ctx, ) => {
    await ctx.db.insert("users", {
      name: "Steve",
    });
  },
});