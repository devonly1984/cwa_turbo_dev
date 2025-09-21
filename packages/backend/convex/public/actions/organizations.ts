import { action } from "@workspace/backend/_generated/server.js";
import { v } from "convex/values";
import { createClerkClient } from "@clerk/backend";
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
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
 } catch {
   return { valid: false, reason: "Organization not found" };
 }
 
    
      
    
  },
});