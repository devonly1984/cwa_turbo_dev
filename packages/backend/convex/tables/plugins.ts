import { v } from "convex/values";
import { defineTable } from "convex/server";

export default defineTable({
  organizationId: v.string(),
  service: v.union(v.literal("vapi")),
  secretName: v.string(),
})
  .index("by_organization_id", ["organizationId"])
  .index("by_organization_id_and_service", ["organizationId", "service"]);