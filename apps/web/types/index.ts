import { ReactNode } from "react";
export type LayoutProps = {
  children: ReactNode;
};

export interface SidebarGroupsProps {
  pathname?: string;
  isActive: (url: string) => boolean;
}