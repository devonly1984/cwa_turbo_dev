
import { cn } from "@workspace/ui/lib/utils";
import { statusConfig } from "@workspace/ui/constants/index";

interface ConversationStatusIconProps {
  status: "unresolved" | "escalated" | "resolved";
}
const ConversationStatusIcon = ({
  status,
}: ConversationStatusIconProps) => {
const config = statusConfig[status];
const Icon = config.icon
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full p-1.5",
        config.bgColor
      )}
    >
      <Icon className="size-3 stroke-3 text-white" />
    </div>
  );
};
export default ConversationStatusIcon;
