"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  List,
  ArrowRight,
  ArrowUp,
  Check,
  CornerUpLeft,
} from "lucide-react";
import ConversationScrollArea from "./ConversationScrollArea";
const ConversationSelect = () => {
  return (
    <>
      <Select defaultValue="all" onValueChange={() => {}} value="all">
        <SelectTrigger className="h-8 border-none px-1.5 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
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
      <ConversationScrollArea />
    </>
  );
};
export default ConversationSelect;
