"use client";
import {
  type WidgetChatFormSchema,
  widgetChatFormSchema,
} from "@/lib/schemas/WidgetChatFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/convex/_generated/api";
import { useAction, UsePaginatedQueryResult } from "convex/react";
import {  useForm } from "react-hook-form";
import { Form, FormField } from "@workspace/ui/components/form";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { toUIMessages } from "@convex-dev/agent/react";
import { AIMessage, AIMessageContent } from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import { AIInput, AIInputSubmit, AIInputTextarea, AIInputToolbar, AIInputTools } from "@workspace/ui/components/ai/input";
import {
  AISuggestion,
  AISuggestions,
} from "@workspace/ui/components/ai/suggestion";
interface WidgetChatFormProps {
  conversation: any;
  contactSessionId: Id<"contactSessions"> | null;
  messages:UsePaginatedQueryResult<any>
}
const WidgetChatForm = ({
  conversation,
  contactSessionId,
  messages,
}: WidgetChatFormProps) => {
  const chatForm = useForm<WidgetChatFormSchema>({
    resolver: zodResolver(widgetChatFormSchema),
    defaultValues: {
      message: "",
    },
  });
  const createMessage = useAction(api.public.actions.messages.create);

  const onSubmit = async (values: WidgetChatFormSchema) => {
    if (!conversation) {
      return;
    }
    chatForm.reset();
    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    });
  };

  return (
    <>
      <AIConversation>
        <AIConversationContent>
          {toUIMessages(messages.results ?? []).map((message) => (
            <AIMessage
              from={message.role === "user" ? "user" : "assistant"}
              key={message.id}
            >
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>
              {/**Add DiceBear */}
            </AIMessage>
          ))}
        </AIConversationContent>
      </AIConversation>
      {/**Add Suggestions */}

      <Form {...chatForm}>
        <AIInput
          onSubmit={chatForm.handleSubmit(onSubmit)}
          className="rounded-none border-x-0 border-b-0"
        >
          <FormField
            control={chatForm.control}
            disabled={conversation?.status === "resolved"}
            name="message"
            render={({ field }) => (
              <AIInputTextarea
                disabled={conversation?.status === "resolved"}
                onChange={field.onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    chatForm.handleSubmit(onSubmit)();
                  }
                }}
                placeholder={
                  conversation?.status === "resolved"
                    ? "The conversation has been resolved"
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
                !chatForm.formState.isValid
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
export default WidgetChatForm;
