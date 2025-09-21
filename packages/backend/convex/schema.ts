import { defineSchema } from "convex/server";
import { users, contactSessions, conversations } from "./tables/index.js";

export default defineSchema({
  users,
  contactSessions,
  conversations,
});