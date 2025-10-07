import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";
export type LayoutProps = {
  children: ReactNode;
};

export interface SidebarGroupsProps {
  isActive: (url: string) => boolean;
}

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}
