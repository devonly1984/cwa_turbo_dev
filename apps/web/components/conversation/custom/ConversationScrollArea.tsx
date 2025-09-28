"use client"
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { usePaginatedQuery } from "convex/react";
 import { formatDistanceToNow } from "date-fns";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import {api} from '@workspace/backend/_generated/api'
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/utils";
import {
  ConversationStatusIcon,
  DiceBearAvatar,
  InfiniteScrollTrigger,
} from "@workspace/ui/components/shared";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import ConversationSkeleton from "../skeletons/ConversationSkeleton";
interface ConversationScrollAreaProps {
  statusFilter: Doc<"conversations">["status"] | "all" ;
  setStatusFilter: (value: Doc<"conversations">["status"] | "all") => void;
}
const ConversationScrollArea = ({
  statusFilter,
  setStatusFilter,
}: ConversationScrollAreaProps) => {
  const pathname = usePathname();
  const conversations = usePaginatedQuery(
    api.private.queries.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    {
      initialNumItems: 10,
    }
  );
  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore,isLoadingFirstPage } =
    useInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 10,
    });
  return (
    <>
      {isLoadingFirstPage ? (
        <ConversationSkeleton />
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex w-full flex-1 flex-col text-sm">
            {conversations &&
              conversations?.results?.map((conversation) => {
                const isLastMessageFromOperator =
                  conversation?.lastMessage?.message?.role !== "user";
                const country = getCountryFromTimezone(
                  conversation.contactSession.metadata?.timezone
                );
                const countryFlagUrl = country?.code
                  ? getCountryFlagUrl(country.code)
                  : undefined;
                return (
                  <Link
                    key={conversation._id}
                    className={cn(
                      "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                      pathname === `/conversations/${conversation._id}` &&
                        "bg-accent text-accent-foreground"
                    )}
                    href={`/conversations/${conversation._id}`}
                  >
                    <div
                      className={cn(
                        "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
                        pathname ===
                          `/conversations/${conversation._id}` &&
                          "opacity-100"
                      )}
                    />
                    <DiceBearAvatar
                      seed={conversation.contactSession._id}
                      badgeImageUrl={countryFlagUrl}
                      size={40}
                      className="shrink-0"
                    />
                    <div className="flex-1 ">
                      <div className="flex w-full items-center gap-2">
                        <span className="truncate font-bold">
                          {conversation.contactSession.name}
                        </span>
                        <span className="ml-auto shrink-0 text-muted-foreground text-xs">
                          {formatDistanceToNow(
                            new Date(conversation._creationTime)
                          )}
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
                            {conversation?.lastMessage?.text}
                          </span>
                        </div>
                        <ConversationStatusIcon
                          status={conversation?.status}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            <InfiniteScrollTrigger
              ref={topElementRef}
              canLoadMore={canLoadMore}
              onLoadMore={handleLoadMore}
              isLoadingMore={isLoadingMore}
            />
          </div>
        </ScrollArea>
      )}
    </>
  );
};
export default ConversationScrollArea;
