"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import { api } from "@workspace/backend/_generated/api";
import { Doc, Id } from "@workspace/backend/_generated/dataModel";
import {
  AIConversation,
  AIConversationContent,
 
} from "@workspace/ui/components/ai/conversation";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/source";
import { useForm } from "react-hook-form";
import { ChatScreenFormSchema, chatScreenFormSchema } from "@/lib/schemas/chatScreenFormSchema";
import { useAction } from "convex/react";
import { Form, FormField } from "@workspace/ui/components/form";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import {
  InfiniteScrollTrigger,
  DiceBearAvatar,
} from "@workspace/ui/components/shared";
interface WidgetChatScreenFormProps {
  conversation:
    | {
        _id: Id<"conversations">;
        status: Doc<"conversations">["status"];
        threadId: string;
      }
    | undefined;
  contactSessionId: Id<"contactSessions"> | null;
}

const WidgetChatScreenForm  = ({conversation,contactSessionId}:WidgetChatScreenFormProps)=>{
  
  const chatScreenForm = useForm<ChatScreenFormSchema>({
    resolver: zodResolver(chatScreenFormSchema),
    defaultValues: {
      message: "",
    },
  });
  const createMessage = useAction(api.public.actions.messages.create);

const messages = useThreadMessages(
  api.public.queries.messages.getMany,
  conversation?.threadId && contactSessionId
    ? {
        threadId: conversation.threadId,
        contactSessionId,
      }
    : "skip",
    {initialNumItems: 10}
);
const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
  useInfiniteScroll({
    status: messages.status,
    loadMore: messages.loadMore,
    loadSize: 10,
  });
  const onSubmit = async(values:ChatScreenFormSchema)=>{
    if (!conversation || !contactSessionId) {
      return;
    }
    chatScreenForm.reset();
    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
   
    });
  }
  return (
    <>
      <AIConversation>
        <AIConversationContent>
          <InfiniteScrollTrigger
            ref={topElementRef}
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
          {toUIMessages(messages.results ?? [])?.map((message) => {
            return (
              <AIMessage
                from={message.role === "user" ? "user" : "assistant"}
                key={message.id}
              >
                <AIMessageContent>
                  <AIResponse>{message.text}</AIResponse>
                </AIMessageContent>
                {message.role === "assistant" && (
                  <DiceBearAvatar
                    imageUrl="/logo.svg"
                    seed="assistant"
                    size={32}
                  />
                )}
              </AIMessage>
            );
          })}
        </AIConversationContent>
      </AIConversation>
      {/**Add Suggestions */}
      <Form {...chatScreenForm}>
        <AIInput
          onSubmit={chatScreenForm.handleSubmit(onSubmit)}
          className=" rouned-none border-x-0 border-b-0"
        >
          <FormField
            control={chatScreenForm.control}
            disabled={conversation?.status === "resolved"}
            name="message"
            render={({ field }) => (
              <AIInputTextarea
                disabled={conversation?.status === "resolved"}
                onChange={field.onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    e.preventDefault();
                    chatScreenForm.handleSubmit(onSubmit)();
                  }
                }}
                placeholder={
                  conversation?.status === "resolved"
                    ? "This conversation has been resolved"
                    : "Type your message"
                }
                value={field.value}
              />
            )}
          />
          <AIInputToolbar>
            <AIInputTools />
            <AIInputSubmit
              disabled={
                conversation?.status === "resolved" ||
                !chatScreenForm.formState.isValid
              }
              status="ready"
              type="submit"
            />
          </AIInputToolbar>
        </AIInput>
      </Form>
    </>
  );
};
export default WidgetChatScreenForm;
