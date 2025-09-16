import { mutation } from "@workspace/backend/_generated/server.js";
import { v } from "convex/values";

export const add = mutation({
  args: {},
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: "Steve",
    });
    return userId;
  },
});