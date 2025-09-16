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
import type * as lib_convexUtils from "../lib/convexUtils.js";
import type * as public_mutations_users from "../public/mutations/users.js";
import type * as public_queries_users from "../public/queries/users.js";
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
  "lib/convexUtils": typeof lib_convexUtils;
  "public/mutations/users": typeof public_mutations_users;
  "public/queries/users": typeof public_queries_users;
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
