"use client";

import { Doc, Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";

import { MoreHorizontal } from "lucide-react";
import ConversationIdForm from "../forms/ConversationIdForm";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import ConverstationStatusButton from "../custom/ConverstationStatusButton";
import { useState } from "react";


interface ConversationsIdViewProps {
  conversationId: Id<"conversations">;
}
const ConversationsIdView = ({
  conversationId,
}: ConversationsIdViewProps) => {
   const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const conversation = useQuery(api.private.queries.conversations.getOne, {
      conversationId,
    });
      const updateStatus = useMutation(
        api.private.mutations.conversations.updateStatus
      );
    const handleToggleStatus = async () => {
    if (!conversation) {
      return;
    }
    setIsUpdatingStatus(true);
    let newStatus: Doc<"conversations">["status"];
    switch (conversation.status) {
      case "unresolved":
        newStatus = "escalated";
        break;
      case "escalated":
        newStatus = "resolved";
        break;

      default:
        newStatus = "unresolved";
        break;
    }
    try {
      await updateStatus({
        conversationId,
        status: newStatus,
      });
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  return (
    <div className="flex h-full flex-col bg-muted">
      <header className="flex items-center justify-between border-b bg-background p-2.5">
        <Button size="sm" variant={"ghost"}>
          <MoreHorizontal />
        </Button>
        {!!conversation && (
          <ConverstationStatusButton
            onClick={handleToggleStatus}
            status={conversation.status}
            disabled={isUpdatingStatus}
          />
        )}
      </header>
      {!!conversation && (
        <ConversationIdForm
          conversation={conversation}
          conversationId={conversationId}
        />
      )}
    </div>
  );
};
export default ConversationsIdView;
