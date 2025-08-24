import { defineSchema } from "convex/server";

import {contactSessions, conversations, users} from './tables/index.js'

export default defineSchema({
  users,
  contactSessions,
  conversations,
});
