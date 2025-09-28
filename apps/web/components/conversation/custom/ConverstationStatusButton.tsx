"use client"
import { Doc } from "@workspace/backend/_generated/dataModel"
import { Button } from "@workspace/ui/components/button";
import Hint from "@workspace/ui/components/shared/Hint";
import { ArrowRight, ArrowUp, Check } from "lucide-react";
interface ConverstationStatusButtonProps {
  status: Doc<"conversations">["status"];
  onClick:()=>void;
  disabled?:boolean;
}
const ConverstationStatusButton = ({
  status,
  onClick,
  disabled
}: ConverstationStatusButtonProps) => {
  switch(status) {
    case 'resolved': 
    return (
      <Hint text="Mark as unresolved">
        <Button disabled={disabled} onClick={onClick} size="sm" variant={"tertiary"}>
          <Check />
          Resolved
        </Button>
      </Hint>
    );
    case 'escalated': 
    return (
      <Hint text="Mark as resolved">
        <Button disabled={disabled} onClick={onClick} size="sm" variant={"warning"}>
          <ArrowUp />
          Escalated
        </Button>
      </Hint>
    );
    default:
        return (
          <Hint text="Mark as escalated">
            <Button
              disabled={disabled}
              onClick={onClick}
              size="sm"
              variant={"tertiary"}
            >
              <ArrowRight />
              Unresolved
            </Button>
          </Hint>
        );
  }
};
export default ConverstationStatusButton