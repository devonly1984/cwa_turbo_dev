import { internalQuery } from "@workspace/backend/_generated/server.js";
import { v } from "convex/values";

export const getByOrganizationIdAndService = internalQuery({
  args: {
    organizationId: v.string(),
    service: v.union(v.literal("vapi")),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("plugins")
      .withIndex("by_organization_id_and_service", (q) =>
        q
          .eq("organizationId", args.organizationId)
          .eq("service", args.service)
      )
      .unique();
  },
});