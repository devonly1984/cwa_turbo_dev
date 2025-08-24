import ConversationLayout from "@/components/conversations/layouts/ConversationLayout";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <ConversationLayout>{children}</ConversationLayout>;
};
export default Layout;
