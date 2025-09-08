"use client"
import { useThreadMessages } from "@convex-dev/agent/react";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../layout";
import { ArrowLeft, Menu } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "../store/widgetAtom";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import WidgetChatForm from "../forms/WidgetChatForm";


const WidgetChatScreen = () => {
  //Setters
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  //Atoms
const conversationId = useAtomValue(conversationIdAtom);

const organizationId = useAtomValue(organizationIdAtom)
const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId||"org_32JmQUkcfbN90JkYPHrBWc2Oz0w"))

const conversation = useQuery(
  api.public.queries.conversations.getOne,
  conversationId && contactSessionId
    ? {
        conversationId,
        contactSessionId,
      }
    : "skip"
);
const messages = useThreadMessages(
  api.public.queries.messages.getMany,
  conversation?.threadId && contactSessionId
    ? {
        threadId: conversation.threadId,
        contactSessionId,
      }
    : "skip",
  { initialNumItems: 10 }
);

const onBack = ()=>{
  setConversationId(null);
  setScreen("selection");
}
  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button size="icon" variant={"transparent"} onClick={onBack}>
            <ArrowLeft />
          </Button>
          <p>Chat</p>
        </div>
        <Button size="icon" variant={"transparent"}>
          <Menu />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 flex-col  gap-y-4 p-4 ">
        <WidgetChatForm
          conversation={conversation}
          contactSessionId={contactSessionId}
          messages={messages}
        />
      </div>
    </>
  );
};
export default WidgetChatScreen