import {v} from 'convex/values';
import { action } from '../../_generated/server.js';
import { createClerkClient } from "@clerk/backend";
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
export const validate = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, { organizationId }) => {
    try {
      await clerkClient.organizations.getOrganization({
        organizationId,
      });
      return { valid: true };
    } catch (error) {
      return { valid: false, reason: "Organization not found" };
    }
  },
});