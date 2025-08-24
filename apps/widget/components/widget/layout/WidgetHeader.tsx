import { cn } from "@workspace/ui/lib/utils";
import { ReactNode } from "react"

interface WidgetHeaderProps {
    children: ReactNode;
    className?:string;
}
const WidgetHeader = ({children,className}:WidgetHeaderProps) => {
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