"use client";
import { statusFilterAtom } from "@/store/webAtoms";
import { CONVERSATION_STATUSES } from "@/types";
import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowRight, ArrowUp, Check, List } from "lucide-react";
const ConversationSelect = () => {
    const statusFilter = useAtomValue(statusFilterAtom);
    const setStatusFilter = useSetAtom(statusFilterAtom);
  return (
    <Select
      defaultValue="all"
      onValueChange={(value) =>
        setStatusFilter(value as CONVERSATION_STATUSES | "all")
      }
      value={statusFilter}
    >
      <SelectTrigger
        className="h-8 border-none px-1.5 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground
      focus-visible:ring-0"
      >
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <div className="flex items-center gap-2">
            <List className="size-4" />
            <span>All</span>
          </div>
        </SelectItem>
        <SelectItem value="unresolved">
          <div className="flex items-center gap-2">
            <ArrowRight className="size-4" />
            <span>Unresolved</span>
          </div>
        </SelectItem>
        <SelectItem value="escalated">
          <div className="flex items-center gap-2">
            <ArrowUp className="size-4" />
            <span>Escalated</span>
          </div>
        </SelectItem>
        <SelectItem value="resolved">
          <div className="flex items-center gap-2">
            <Check className="size-4" />
            <span>Resolved</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
export default ConversationSelect;
