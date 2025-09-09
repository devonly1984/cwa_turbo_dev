import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type CONVERSATION_STATUSES = Doc<"conversations">["status"] ;