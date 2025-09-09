"use client";
import { api } from "@workspace/backend/convex/_generated/api";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import ConversationIdForm from "../forms/ConversationIdForm";
interface ConversationIdViewProps {
  conversationId: Id<"conversations">;
}
const ConversationIdView = ({
  conversationId,
}: ConversationIdViewProps) => {
  const conversation = useQuery(api.private.queries.conversations.getOne, {
    conversationId,
  });
  
  return (
    <div className="flex h-full flex-col bg-muted">
      <header className="flex items-center justify-between border-b bg-background p-2.5">
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </header>
      <ConversationIdForm conversation={conversation} />
    </div>
  );
};
export default ConversationIdView;
