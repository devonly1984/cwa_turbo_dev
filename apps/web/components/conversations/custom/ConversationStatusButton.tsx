"use client";

import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { Hint } from "@workspace/ui/components/shared";
import { ArrowRight, ArrowUp, Check } from "lucide-react";

interface ConversationStatusButtonProps {
    status: Doc<'conversations'>['status'];
    onClick:()=>void;
    disabled?:boolean;
}
const ConversationStatusButton = ({
  status,
  onClick,
  disabled,
}: ConversationStatusButtonProps) => {
  if (status === "resolved") {
    return (
      <Hint text="Mark as unresolved">
        <Button
          disabled={disabled}
          onClick={onClick}
          size={"sm"}
          variant={"tertiary"}
        >
          <Check />
          Resolved
        </Button>
      </Hint>
    );
  }
  if (status === "escalated") {
    return (
      <Hint text="Mark as resolved">
        <Button
          disabled={disabled}
          onClick={onClick}
          size={"sm"}
          variant={"warning"}
        >
          <ArrowUp />
          Escalated
        </Button>
      </Hint>
    );
  }

  return (
    <Hint text="Mark as escalated">
      <Button
        disabled={disabled}
        onClick={onClick}
        size={"sm"}
        variant={"destructive"}
      >
        <ArrowRight />
        UnResolved
      </Button>
    </Hint>
  );
};
export default ConversationStatusButton