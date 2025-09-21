import { WidgetLayoutProps } from "@/types"
import { cn } from "@workspace/ui/lib/utils";

const WidgetHeader = ({children,className}:WidgetLayoutProps) => {
  return (
    <header
      className={cn(
        "bg-gradient-to-b from-primary to-[#0b63f3] p-4 text-primary-foreground",
        className
      )}
    >
        {children}
    </header>
  );
}
export default WidgetHeader