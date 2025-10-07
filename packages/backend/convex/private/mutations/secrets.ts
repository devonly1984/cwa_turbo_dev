import { internal } from "@workspace/backend/_generated/api.js";
import { mutation } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { v } from "convex/values";

export const upsert = mutation({
    args: {
        service: v.union(v.literal('vapi')),
        value: v.any()
    },
    handler: async(ctx,args)=>{
        const {orgId} = await getIdentity(ctx);
        //TODO: check for subscription


        await ctx.scheduler.runAfter(
          0,
          internal.system.actions.secrets.upsert,
          {
            service: args.service,
            organizationId: orgId,
            value: args.value,
          }
        );
        

    }
})