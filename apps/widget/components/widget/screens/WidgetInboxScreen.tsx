"use client"
import { Button } from "@workspace/ui/components/button";
import WidgetFooter from "../layouts/WidgetFooter";
import WidgetHeader from "../layouts/WidgetHeader";
import { ArrowLeft } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "@/store/widgetAtoms";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { formatDistanceToNow } from "date-fns";
import ConversationStatusIcon from "@workspace/ui/components/shared/ConversationStatusIcon";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import InfinitScrollTrigger from "@workspace/ui/components/shared/InfiniteScrollTrigger";
const WidgetInboxScreen = () => {

  //SETTERS
const setScreen = useSetAtom(screenAtom);
const setConversationId = useSetAtom(conversationIdAtom);
//ATOMS
const organizationId = useAtomValue(organizationIdAtom);
const contactSessionId = useAtomValue(
  contactSessionIdAtomFamily(organizationId || "")
);
const conversations = usePaginatedQuery(
  api.public.queries.conversations.getMany,
  contactSessionId
    ? {
        contactSessionId,
      }
    : "skip",
  { initialNumItems: 10 }
);
const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
  useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });
  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2 ">
          <Button
            variant={"transparent"}
            size={"icon"}
            onClick={() => setScreen("selection")}
          >
            <ArrowLeft />
          </Button>
          <p>Inbox</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col  gap-y-2 overflow-y-auto ">
        {conversations?.results.length > 0 &&
          conversations.results.map((conversation) => (
            <Button
              className="h-20 w-full justify-between"
              key={conversation._id}
              onClick={() => {
                setConversationId(conversation._id);
                setScreen("chat");
              }}
              variant={"outline"}
            >
              <div className="flex w-full flex-col gap-4 overflow-hidden text-start">
                <div className="flex w-full items-center justify-between gap-x-2">
                  <p className="text-muted-foreground text-xs">Chat</p>
                  <p className="text-muted-foreground text-xs">
                    {formatDistanceToNow(
                      new Date(conversation._creationTime)
                    )}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between gap-x-2">
                  <p className="truncate text-sm">
                    {conversation.lastMessage?.text}
                  </p>
                  <ConversationStatusIcon status={conversation.status} />
                </div>
              </div>
            </Button>
          ))}
        <InfinitScrollTrigger
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          ref={topElementRef}
        />
      </div>
      <WidgetFooter />
    </>
  );
};
export default WidgetInboxScreen;