import { ArrowRight, ArrowUp, Check } from "lucide-react";

export const statusConfig = {
  resolved: {
    icon: Check,
    bgColor: "bg-[#3fb62f]",
  },
  unresolved: {
    icon: ArrowRight,
    bgColor: "bg-destructive",
  },
  escalated: {
    icon: ArrowUp,
    bgColor: "bg-yellow-500",
  },
} as const;