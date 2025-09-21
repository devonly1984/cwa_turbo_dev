import { mutation } from "@workspace/backend/_generated/server.js";
import { SESSION_DURATION } from "@workspace/backend/constants/index.js";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    organizationId: v.string(),
    metadata: v.optional(
      v.object({
        userAgent: v.optional(v.string()),
        language: v.optional(v.string()),
        languages: v.optional(v.string()),
        platform: v.optional(v.string()),
        vendor: v.optional(v.string()),
        screenResolution: v.optional(v.string()),
        viewportSize: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        cookieEnabled: v.optional(v.boolean()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, { name, email, organizationId, metadata }) => {
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION;
    const contactSessionId = await ctx.db.insert("contactSessions", {
      name,
      email,
      organizationId,
      expiresAt,
      metadata,
    });
    return contactSessionId;
  },
});
export const validate = mutation({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, {contactSessionId}) => {
   const contactSession = await ctx.db.get(contactSessionId);
   if (!contactSession) {
    return { valid: false, reason: "Contact Session not found" };
   }
   if (contactSession.expiresAt < Date.now()) {
    return { valid: false, reason: "Contact Session Expired" };
   }
   return { valid: true, contactSession };
  },
});