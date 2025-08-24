"use client";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/shared";
import {  CornerUpLeft} from "lucide-react";
import {ScrollArea} from '@workspace/ui/components/scroll-area'
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import {ConversationStatusIcon, DiceBearAvatar} from '@workspace/ui/components/shared'
import { formatDistanceToNow } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai/react";
import { statusFilterAtom } from "@/atoms/WebAtoms";
import ConversationSelect from "../custom/ConversationSelect";
import ConversationSkeleton from "../custom/ConversationSkeleton";
const ConversationsPanel = () => {
  const pathname = usePathname();
  const statusFilter = useAtomValue(statusFilterAtom);
  const setStatusFilter = useSetAtom(statusFilterAtom);

  const conversations = usePaginatedQuery(
    api.private.queries.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    { initialNumItems: 10 }
  );
  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });
  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <ConversationSelect
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
      {isLoadingFirstPage ? (
        <ConversationSkeleton />
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex w-full flex-1 flex-col text-sm">
            {conversations.results.map((conversation) => {
              const isLastMessageFromOperator =
                conversation.lastMessage?.message?.role !== "user";
              const country = getCountryFromTimezone(
                conversation.contactSession.metadata?.timezone
              );
              const countryFlagUrl = country?.code
                ? getCountryFlagUrl(country?.code)
                : undefined;
              return (
                <Link
                  key={conversation._id}
                  href={`/conversations/${conversation._id}`}
                  className={cn(
                    "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                    pathname === `/conversations/${conversation._id}` &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
                      pathname === `/conversations/${conversation._id}` &&
                        "opacity-100"
                    )}
                  />
                  <DiceBearAvatar
                    seed={conversation.contactSession._id}
                    badgeImageUrl={countryFlagUrl}
                    size={40}
                    className="shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex w-full items-center gap-2">
                      <span className="truncate font-bold">
                        {conversation.contactSession.name}
                      </span>
                      <span className="ml-auto shrink-0 text-muted-foreground text-xs">
                        {formatDistanceToNow(conversation._creationTime)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="flex w-0 grow items-center gap-1">
                        {isLastMessageFromOperator && (
                          <CornerUpLeft className="size-3 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-muted-foreground text-xs",
                            !isLastMessageFromOperator &&
                              "font-bold text-black"
                          )}
                        >
                          {conversation.lastMessage?.text}
                        </span>
                      </div>
                      <ConversationStatusIcon
                        status={conversation.status}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
            <InfiniteScrollTrigger
              ref={topElementRef}
              onLoadMore={handleLoadMore}
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
export default ConversationsPanel;
