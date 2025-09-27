import { ReactNode } from "react";
export type LayoutProps = {
  children: ReactNode;
};

export interface SidebarGroupsProps {

  isActive: (url: string) => boolean;
}