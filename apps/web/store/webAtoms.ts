import { atomWithStorage } from "jotai/utils";
import { Doc } from "@workspace/backend/_generated/dataModel";

export const STATUS_FILTER_KEY = "echo-status-filter";
export const statusFilterAtom = atomWithStorage<
  Doc<"conversations">["status"] | "all"
>(STATUS_FILTER_KEY, "all");