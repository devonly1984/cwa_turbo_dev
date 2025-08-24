"use client";
import {
  converationIdSchema,
  ConversationIdSchema,
} from "@/schemas/conversationIdSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import { Form, FormField } from "@workspace/ui/components/form";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { DiceBearAvatar } from "@workspace/ui/components/shared";
import { Wand2 } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { useInfiniteScroll } from "@workspace/ui/hooks/useInfiniteScroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/shared";
import { enhanceResponse } from "@workspace/backend/convex/private/actions/messages";
import { useState } from "react";
import ConversationIdViewSkeleton from "@/components/conversations/custom/ConversationIdViewSkeleton";
interface ConversationIdFormProps {
  conversation: Doc<"conversations">;
}
const ConversationIdForm = ({ conversation }: ConversationIdFormProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const conversationForm = useForm<ConversationIdSchema>({
    resolver: zodResolver(converationIdSchema),
    defaultValues: {
      message: "",
    },
  });
  const messages = useThreadMessages(
    api.private.queries.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );
    const enhanceReponse = useAction(api.private.actions.messages.enhanceResponse)
    const handleEnhanceResponse = async()=>{
      setIsEnhancing(true);
      const currentValue = conversationForm.getValues('message');
      try {
        const response = await enhanceResponse({ prompt: currentValue });
        conversationForm.setValue("message", response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsEnhancing(false);
      }
    }
     if (conversation===undefined || messages.status==='LoadingFirstPage') {
      return <ConversationIdViewSkeleton/>

  }
  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });
  
  const createMessage = useMutation(api.private.mutations.messages.create);
  const onSubmit = async (values: ConversationIdSchema) => {
    try {
      await createMessage({
        conversationId: conversation._id,
        prompt: values.message,
      });
      conversationForm.reset();
    } catch (error) {
      console.log(error);
    }
  };
 

  return (
    <AIConversation className="max-h-[calc(100vh-180px)]">
      <AIConversationContent>
        <InfiniteScrollTrigger
          ref={topElementRef}
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
        />
        {toUIMessages(messages.results ?? []).map((message) => (
          <AIMessage
            from={message.role === "user" ? "assistant" : "user"}
            key={message.id}
          >
            <AIMessageContent>
              <AIResponse>{message.content}</AIResponse>
            </AIMessageContent>
            {message.role === "user" && (
              <DiceBearAvatar
                seed={conversation.contactSessionId ?? ""}
                size={32}
              />
            )}
          </AIMessage>
        ))}
      </AIConversationContent>
      <AIConversationScrollButton />
      <div className="p-2">
        <Form {...conversationForm}>
          <AIInput onSubmit={conversationForm.handleSubmit(onSubmit)}>
            <FormField
              control={conversationForm.control}
              disabled={conversation?.status === "resolved"}
              name="message"
              render={({ field }) => (
                <AIInputTextarea
                  disabled={
                    conversation?.status === "resolved" ||
                    conversationForm.formState.isSubmitting ||
                    isEnhancing
                  }
                  onChange={field.onChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.shiftKey) {
                      e.preventDefault();
                      conversationForm.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    conversation?.status === "resolved"
                      ? "This conversation has been resolved"
                      : "Type your response as an operator..."
                  }
                  value={field.value}
                />
              )}
            />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton
                  disabled={
                    conversation?.status === "resolved" ||
                    isEnhancing ||
                    conversationForm.formState.isValid
                  }
                  onClick={handleEnhanceResponse}
                >
                  <Wand2 />
                  {isEnhancing ? "Enhacing..." : "Enhance"}
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit
                disabled={
                  conversation?.status === "resolved" ||
                  !conversationForm.formState.isValid ||
                  conversationForm.formState.isSubmitting ||
                  isEnhancing
                }
                status="ready"
                type="submit"
              />
            </AIInputToolbar>
          </AIInput>
        </Form>
      </div>
    </AIConversation>
  );
};
export default ConversationIdForm;
