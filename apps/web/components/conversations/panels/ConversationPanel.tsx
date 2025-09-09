"use client";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import { usePaginatedQuery } from "convex/react";
import ConversationSelect from "../custom/ConversationSelect";
import { api } from "@workspace/backend/convex/_generated/api";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { statusFilterAtom } from "@/store/webAtoms";
import ConversationSkeleton from "@/components/conversations/skeletons/ConversationSkeleton";
import ConversationScrollArea from "../custom/ConversationScrollArea";

const ConversationPanel = () => {
  const statusFilter = useAtomValue(statusFilterAtom);
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
      <div className="flex flex-col gap-3.5 border-b p-2 ">
        <ConversationSelect />
      </div>
      {isLoadingFirstPage ? (
        <ConversationSkeleton />
      ) : (
        <ConversationScrollArea
          pathname={pathname}
          conversations={conversations}
          topElementRef={topElementRef}
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};
export default ConversationPanel;
