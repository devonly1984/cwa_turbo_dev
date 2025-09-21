"use client"
import { Button } from "@workspace/ui/components/button";
import WidgetHeader from "../layouts/WidgetHeader"
import { ArrowLeft, Menu } from "lucide-react";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/store/widgetAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

const WidgetChatScreen = () => {
  //setters
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  //atoms
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId||"")
  )
  const conversation = useQuery(
    api.public.queries.conversations.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );
  const onBack = ()=>{
    setConversationId(null);
    setScreen("selection");
  }
  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 ">
          <Button size={"icon"} variant={"transparent"} onClick={onBack}>
            <ArrowLeft />
          </Button>
          <p>Chat</p>
        </div>
        <Button size={"icon"} variant={"transparent"}>
          <Menu />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 flex-col  gap-y-4 p-4 ">
        {JSON.stringify(conversation)}
      </div>
    </>
  );
}
export default WidgetChatScreen