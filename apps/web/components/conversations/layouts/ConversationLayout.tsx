import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ReactNode } from "react";
import ConversationsPanel from "../panels/ConversationsPanel";
interface ConversationLayoutProps {
    children: ReactNode;
}
const ConversationLayout = ({ children }: ConversationLayoutProps) => {
  return (
    <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
      <ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
        <ConversationsPanel/>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-full" defaultSize={70}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default ConversationLayout;
