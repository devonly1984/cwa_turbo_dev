import { LayoutProps } from "@/types"
import ConversationLayout from "@/components/conversation/layouts/ConversationLayout";
const Layout = ({children}:LayoutProps) => {
  return <ConversationLayout>{children}</ConversationLayout>;
}
export default Layout