import {v} from 'convex/values';
import { internal } from '@workspace/backend/_generated/api.js';
import { internalAction } from '@workspace/backend/_generated/server.js';
import { upsertSecret } from '@workspace/backend/lib/secrets.js';

export const upsert = internalAction({
  args: {
    organizationId: v.string(),
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const secretName = `tenant/${args.organizationId}/${args.service}`;
    await upsertSecret(secretName, args.value);
    await ctx.runMutation(internal.system.mutations.plugins.upsert, {
      service: args.service,
      secretName,
      organizationId: args.organizationId,
    });
    
    return {
      status: "success",
    };
  },
});