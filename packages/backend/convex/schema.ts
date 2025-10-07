import { defineSchema } from "convex/server";
import { users, contactSessions, conversations, plugins } from "./tables/index.js";

export default defineSchema({
  users,
  contactSessions,
  conversations,
  plugins,
});