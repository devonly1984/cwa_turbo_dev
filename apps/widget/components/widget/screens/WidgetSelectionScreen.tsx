"use client";

import {  ChevronRight,  MessageSquareText } from "lucide-react";
import { WidgetHeader } from "../layout";
import { Button } from "@workspace/ui/components/button";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "../store/widgetAtom";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useState } from "react";

const WidgetSelectionScreen = () => {
  //setters
  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  //Atoms
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
 
  const createConversation = useMutation(
    api.public.mutations.conversations.create
  );
  const [isPending, setIsPending] = useState(false);

  const handleNewChat = async () => {
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing Organization ID");
      return;
    }
    setIsPending(true);
      const conversationId = await createConversation({
        contactSessionId,
        organizationId
      }
      );
    try {
   
      console.log("Created Conversation", conversationId);
      setConversationId(conversationId);
      setScreen("chat");
    } catch {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center  gap-y-4 p-4 overflow-y-auto">
        <Button
          className="h-16 w-full justify-between"
          variant={"outline"}
          onClick={handleNewChat}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareText className="size-4" />
            <span>Start Chat</span>
          </div>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
export default WidgetSelectionScreen