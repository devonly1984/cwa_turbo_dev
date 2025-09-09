import ConversationLayout from "@/components/conversations/layouts/ConversationLayout";

import { LayoutProps } from "@/types";
const Layout = ({ children }: LayoutProps) => {
  return <ConversationLayout>{children}</ConversationLayout>;
};
export default Layout;
