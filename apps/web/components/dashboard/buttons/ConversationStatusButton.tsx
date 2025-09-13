"use client";
import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import Hint from '@workspace/ui/components/shared/Hint'
import { ArrowRight, ArrowUp, Check } from "lucide-react";
interface ConversationStatusButtonProps {
  status: Doc<"conversations">["status"];
  onClick: () => void;
}
const ConversationStatusButton = ({status,onClick}:ConversationStatusButtonProps) => {

  switch(status) {
    case 'resolved': 
    return (
      <Hint text="Mark as Unresolved">
        <Button onClick={onClick} size="sm" variant={"tertiary"}>
          <Check />
          Resolved
        </Button>
      </Hint>
    );
    case 'unresolved':
        return (
          <Hint text="Mark as Escalated">
            <Button onClick={onClick} size={"sm"} variant={"destructive"}>
              <ArrowRight />
              Unresolved
            </Button>
          </Hint>
        );
    case 'escalated':
        return (
          <Hint text="Mark as resolved">
            <Button onClick={onClick} size="sm" variant={"warning"}>
              <ArrowUp />
              Escalated
            </Button>
          </Hint>
        );
  }
};
export default ConversationStatusButton;
