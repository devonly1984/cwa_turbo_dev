/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as constants_index from "../constants/index.js";
import type * as lib_convexUtils from "../lib/convexUtils.js";
import type * as public_actions_organizations from "../public/actions/organizations.js";
import type * as public_mutations_contactSessions from "../public/mutations/contactSessions.js";
import type * as public_mutations_conversations from "../public/mutations/conversations.js";
import type * as public_mutations_users from "../public/mutations/users.js";
import type * as public_queries_conversations from "../public/queries/conversations.js";
import type * as public_queries_users from "../public/queries/users.js";
import type * as tables_contactSessions from "../tables/contactSessions.js";
import type * as tables_conversations from "../tables/conversations.js";
import type * as tables_index from "../tables/index.js";
import type * as tables_users from "../tables/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "constants/index": typeof constants_index;
  "lib/convexUtils": typeof lib_convexUtils;
  "public/actions/organizations": typeof public_actions_organizations;
  "public/mutations/contactSessions": typeof public_mutations_contactSessions;
  "public/mutations/conversations": typeof public_mutations_conversations;
  "public/mutations/users": typeof public_mutations_users;
  "public/queries/conversations": typeof public_queries_conversations;
  "public/queries/users": typeof public_queries_users;
  "tables/contactSessions": typeof tables_contactSessions;
  "tables/conversations": typeof tables_conversations;
  "tables/index": typeof tables_index;
  "tables/users": typeof tables_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
