import { v } from "convex/values";
import { defineTable } from "convex/server";

export default defineTable({
  threadId: v.string(),
  organizationId: v.string(),
  contactSessionId: v.id("contactSessions"),
  status: v.optional(
    v.union(
      v.literal("unresolved"),
      v.literal("escalated"),
      v.literal("resolved")
    )
  ),
})
  .index("by_organization_id", ["organizationId"])
  .index("by_contact_session_id", ["contactSessionId"])
  .index("by_thread_id", ["threadId"])
  .index("by_status_and_organization_id", ["status", "organizationId"]);
