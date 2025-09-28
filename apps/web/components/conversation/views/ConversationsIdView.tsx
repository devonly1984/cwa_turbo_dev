"use client";

import { Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";

import { MoreHorizontal } from "lucide-react";
import ConversationIdForm from "../forms/ConversationIdForm";


interface ConversationsIdViewProps {
  conversationId: Id<"conversations">;
}
const ConversationsIdView = ({
  conversationId,
}: ConversationsIdViewProps) => {
  
  return (
    <div className="flex h-full flex-col bg-muted">
      <header className="flex items-center justify-between border-b bg-background p-2.5">
        <Button size="sm" variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </header>
      <ConversationIdForm conversationId={conversationId} />
    </div>
  );
};
export default ConversationsIdView;
