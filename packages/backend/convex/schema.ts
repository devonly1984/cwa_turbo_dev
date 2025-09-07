import {defineSchema} from 'convex/server'
import { users, contactSessions } from "./tables/index.js";


export default defineSchema({
  users,
  contactSessions,
});