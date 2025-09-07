"use client"

import { useAtomValue } from "jotai";
import { screenAtom } from "@/components/widget/store/widgetAtom";
import {
  WidgetErrorScreen,
  WidgetLoadingScreen,
  WidgetSelectionScreen,
  WidgetVoiceScreen,
  WidgetAuthScreen,
  WidgetInboxScreen,
  WidgetChatScreen,
  WidgetContactScreen,
} from "@/components/widget/screens";


interface WidgetViewProps {
    organizationId:string;
}
const WidgetView = ({organizationId}:WidgetViewProps) => {
  const screen = useAtomValue(screenAtom);
  const screenComponents = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    selection: <WidgetSelectionScreen />,
    voice: <WidgetVoiceScreen />,
    auth: <WidgetAuthScreen />,
    inbox: <WidgetInboxScreen />,
    chat: <WidgetChatScreen />,
    contact: <WidgetContactScreen />,
  };
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      
      {screenComponents[screen]}

      {/*<WidgetFooter />*/}
    </main>
  );
}
export default WidgetView