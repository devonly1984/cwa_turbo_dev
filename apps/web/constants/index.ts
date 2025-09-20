import { CreditCard, Inbox, LayoutDashboard, LibraryBig, Mic, Palette } from "lucide-react";

export const customerSupportItems = [
  {
    title: "Conversations",
    url: "/conversations",
    icon: Inbox,
  },
  {
    title: " Knowledge Base",
    url: "/files",
    icon: LibraryBig,
  },
  
];
export const configurationItems = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: Palette,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboard,
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: Mic,
  },
];
export const accountItems = [
  {
    title: "Plans & Billing",
    url: "/billing",
    icon: CreditCard,
  },
];