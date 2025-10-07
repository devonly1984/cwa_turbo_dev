import { query } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { v } from "convex/values";

export const getOne = query({
    args: {
        service: v.union(v.literal('vapi'))
    },
    handler: async(ctx,args)=>{
        const { orgId } = await getIdentity(ctx);
        return await ctx.db
          .query("plugins")
          .withIndex("by_organization_id_and_service", (q) =>
            q.eq("organizationId", orgId).eq("service", args.service)
          )
          .unique();
    }
})