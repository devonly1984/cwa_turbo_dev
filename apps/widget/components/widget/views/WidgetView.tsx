"use client";

import { screenAtom } from "../atoms/WidgetAtoms";
//import { WidgetHeader, WidgetFooter } from "@/components/widget/layout";
import {
  WidgetErrorScreen,
  WidgetLoadingScreen,
  WidgetAuthScreen,
  WidgetSelectionScreen,
  WidgetChatScreen,
  WidgetInboxScreen,
} from "@/components/widget/screens";
import { useAtomValue } from "jotai";




interface Props {
  organizationId: string | null;
}
const WidgetView = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

const screenComponents = {
  error: <WidgetErrorScreen />,
  loading: <WidgetLoadingScreen organizationId={organizationId} />,
  auth: <WidgetAuthScreen />,
  voice: <p>Voice</p>,
  inbox: <WidgetInboxScreen/>,
  selection: <WidgetSelectionScreen />,
  chat: <WidgetChatScreen />,
  contact: <p>Contact</p>,
} as const;
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
      {/*<WidgetFooter />*/}
    </main>
  );
};
export default WidgetView;