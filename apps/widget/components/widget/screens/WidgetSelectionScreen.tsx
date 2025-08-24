"use client";

import { ChevronRight, MessageSquareText } from "lucide-react";

import { WidgetFooter, WidgetHeader } from "../layout";
import { Button } from "@workspace/ui/components/button";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../atoms/WidgetAtoms";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useState } from "react";

const WidgetSelectionScreen = () => {
  const [isPending, setIsPending] = useState(false);
  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const createConversation = useMutation(
    api.public.mutations.conversations.create
  );
  const handleNewChat = async () => {
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing Organization ID");
      return;
    }
    if (!contactSessionId) {
      setScreen("auth");
      setErrorMessage("Contact Session not found ");
      return;
    }
    setIsPending(true);
    try {
      const converstationId = await createConversation({
        organizationId,
        contactSessionId,
      });
      setConversationId(converstationId);
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
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col  gap-y-4 p-4 overflow-y-auto">
        <Button
          className="h-16 w-full justify-between"
          variant={"outline"}
          onClick={handleNewChat}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareText className="size-4" />
            <span>Start chat</span>
          </div>
          <ChevronRight />
        </Button>
      </div>
      <WidgetFooter />
    </>
  );
};
export default WidgetSelectionScreen;
