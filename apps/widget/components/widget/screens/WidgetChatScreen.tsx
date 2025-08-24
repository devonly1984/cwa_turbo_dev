"use client";
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../layout";
import { ArrowLeft, Menu } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";

import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from "../atoms/WidgetAtoms";
import {  useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";

import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import {
  AISuggestion,
  AISuggestions,
} from "@workspace/ui/components/ai/suggestion";
import ChatForm from "../forms/ChatForm";
import {
  DiceBearAvatar,
  InfiniteScrollTrigger,
} from "@workspace/ui/components/shared";

const WidgetChatScreen = () => {
  //Setters
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  //get ATOMS
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  
  
  const conversation = useQuery(
    api.public.queries.conversations.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
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
  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });
  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };
 

  return (
    <>
      <WidgetHeader className="flex items-cneter justify-between">
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
      <AIConversation>
        <AIConversationContent>
          <InfiniteScrollTrigger
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            ref={topElementRef}
          />
          {toUIMessages(messages.results ?? [])?.map((message) => {
            return (
              <AIMessage
                from={message.role === "user" ? "user" : "assistant"}
                key={message.id}
              >
                <AIMessageContent>
                  <AIResponse>{message.content}</AIResponse>
                </AIMessageContent>
                {message.role === "assistant" && (
                  <DiceBearAvatar
                    imageUrl="/logo.svg"
                    seed="assistant"
                    size={32}
                    badgeImageUrl="/logo.svg"
                  />
                )}
              </AIMessage>
            );
          })}
        </AIConversationContent>
      </AIConversation>
      {/**TODO:Add suggestions */}
      <ChatForm
        conversation={conversation}
        contactSessionId={contactSessionId}
      />
    </>
  );
};
export default WidgetChatScreen;
