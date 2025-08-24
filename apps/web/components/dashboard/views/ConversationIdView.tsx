"use client";
import { api } from "@workspace/backend/convex/_generated/api";
import { Doc, Id } from "@workspace/backend/convex/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import ConversationIdForm from "../forms/ConversationIdForm";
import ConversationStatusButton from "@/components/conversations/custom/ConversationStatusButton";
import { useState } from "react";

interface ConversationIdViewProps {
  conversationId: Id<'conversations'>
}
const ConversationIdView = ({
  conversationId,
}: ConversationIdViewProps) => {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const conversation = useQuery(api.private.queries.conversations.getOne, {
    conversationId,
  });
 const updateConversationStatus = useMutation(
   api.private.mutations.conversations.updateStatus
 );
  const handleToggleStatus = async () => {
    if (!conversation) {
      return;
    }
    setIsUpdatingStatus(true);
    let newStatus: Doc<"conversations">["status"];
    if (conversation.status === "unresolved") {
      newStatus = "escalated";
    } else if (conversation.status === "escalated") {
      newStatus = "resolved";
    } else {
      newStatus = "unresolved";
    }
    try {
      await updateConversationStatus({
        conversationId: conversation._id,
        status: newStatus,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };
 
  return (
    <div className="flex h-full flex-col bg-muted">
      <header className="flex items-center justify-between border-b bg-background p-2.5">
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
        <ConversationStatusButton
          onClick={handleToggleStatus}
          status={conversation?.status as Doc<"conversations">["status"]}
          disabled={isUpdatingStatus}
        />
      </header>
      <ConversationIdForm
        conversation={conversation as Doc<"conversations">}
      />
    </div>
  );
};
export default ConversationIdView;
