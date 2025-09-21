import { WIDGET_SCREENS } from "@/constants";
import { ReactNode } from "react";
export type WidgetLayoutProps = {
  children: ReactNode;
  className?: string;
};
export type WidgetScreen = (typeof WIDGET_SCREENS)[number];

export type InitStep = "org" | "session" | "settings" | "vapi" | "done";