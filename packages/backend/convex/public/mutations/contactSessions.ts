import { mutation } from "../../_generated/server.js";
import {v} from 'convex/values'
import { SESSION_DURATION } from "../../constants/index.js";
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
        viewPortSize: v.optional(v.string()),
        timezone: v.optional(v.string()),
        timezoneOffset: v.optional(v.number()),
        cookiesEnabled: v.optional(v.boolean()),
        referrer: v.optional(v.string()),
        currentUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const expiresAt = now + SESSION_DURATION;
    const {name,email,organizationId,metadata} = args
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
    contactSessionId: v.id('contactSessions')
  },
  handler: async (ctx, {contactSessionId}) => {
    const contactSession = await ctx.db.get(contactSessionId);

    if (!contactSession) {
      return { valid: false, reason: "Contact session not found" };
    }
    if (contactSession.expiresAt < Date.now()) {
      return { valid: false, reason: "Contact session expired" };
    }
    return { valid: true, contactSession };
  },
});