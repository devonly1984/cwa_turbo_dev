import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/utils";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { ConversationStatusIcon, DiceBearAvatar, InfiniteScrollTrigger } from "@workspace/ui/components/shared";
import { cn } from "@workspace/ui/lib/utils";
import { UsePaginatedQueryResult } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { Ref } from "react";
interface ConversationScrollAreaProps {
  conversations: UsePaginatedQueryResult<any>;
  pathname: string;
  topElementRef: Ref<HTMLDivElement | null>;
  canLoadMore:boolean;
  isLoadingMore:boolean;
  handleLoadMore:()=>void;
}
const ConversationScrollArea = ({
  pathname,
  conversations,
  topElementRef,
  canLoadMore,
  isLoadingMore,
  handleLoadMore,
}: ConversationScrollAreaProps) => {
  return (
    <ScrollArea className="max-h-[calc(100vh-53px)]">
      <div className="flex w-full flex-1 flex-col text-sm">
        {conversations.results.map((conversation) => {
          const isLastMessageFromOperator =
            conversation.lastMessage.message.role !== "user";
          const country = getCountryFromTimezone(
            conversation.contactSession.metadata?.timezone
          );
          const countryFlagUrl = country?.code
            ? getCountryFlagUrl(country.code)
            : undefined;
          return (
            <Link
              href={`/conversations/${conversation._id}`}
              key={conversation._id}
              className={cn(
                "relative flex cursor-point items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
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
                  <div className="flex w-0 items-center gap-1 grow">
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
                  <ConversationStatusIcon status={conversation.status} />
                </div>
              </div>
            </Link>
          );
        })}
        <InfiniteScrollTrigger
          ref={topElementRef}
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
        />
      </div>
    </ScrollArea>
  );
};
export default ConversationScrollArea