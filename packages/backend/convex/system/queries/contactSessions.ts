import { internalQuery } from "@workspace/backend/_generated/server.js";
import { v } from "convex/values";


export const getOne = internalQuery({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, { contactSessionId }) => {
    return await ctx.db.get(contactSessionId);
  },
});
