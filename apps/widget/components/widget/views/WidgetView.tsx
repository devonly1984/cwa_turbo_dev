"use client";

import { screenAtom } from "@/store/widgetAtoms";

import {
  WidgetAuthScreen,
  WidgetChatScreen,
  WidgetContactScreen,
  WidgetErrorScreen,
  WidgetInboxScreen,
  WidgetLoadingScreen,
  WidgetSelectionScreen,
  WidgetVoiceScreen,
} from "@/components/widget/screens";
import { useAtomValue } from "jotai";

interface WidgetViewProps {
    organizationId:string;
}
const WidgetView = ({ organizationId }: WidgetViewProps) => {
   const screen = useAtomValue(screenAtom);
   const screenComponents = {
     auth: <WidgetAuthScreen />,
     chat: <WidgetChatScreen />,
     contact: <WidgetContactScreen />,
     error: <WidgetErrorScreen />,
     inbox: <WidgetInboxScreen />,
     loading: <WidgetLoadingScreen organizationId={organizationId} />,
     selection: <WidgetSelectionScreen />,
     voice: <WidgetVoiceScreen />,
   };
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted font-semibold">
      {screenComponents[screen]}
      {/*<WidgetFooter />*/}
    </main>
  );
};
export default WidgetView;
