"use client";
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import {
  conversationIdFormSchema,
  type ConversationIdFormSchema,
} from "@/lib/schemas/ConversationIdSchema";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/convex/_generated/api";
import { DiceBearAvatar } from "@workspace/ui/components/shared";
import { Wand2 } from "lucide-react";
import { useMutation } from "convex/react";

interface ConversationIdFormProps {
  conversation:any;
}
const ConversationIdForm = ({ conversation }: ConversationIdFormProps) => {
  const conversationIdForm = useForm<ConversationIdFormSchema>({
    resolver: zodResolver(conversationIdFormSchema),
    defaultValues: {
      message: "",
    },
  });
  const messages = useThreadMessages(
    api.private.queries.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );
  const createMessage = useMutation(api.private.mutations.messages.create);

  const onSubmit = async (values: ConversationIdFormSchema) => {
   try {
     await createMessage({
       conversationId: conversation._id,
       prompt: values.message,
     });
     conversationIdForm.reset();
   } catch (error) {
    console.error(error);
   }
  };
  return (
    <>
      <AIConversation className="max-h-[calc(100vh-180px)]">
        <AIConversationContent>
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
                  seed={conversation.contactSessionId ?? "user"}
                  size={32}
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>
      <div className="p-2">
        <Form {...conversationIdForm}>
          <AIInput onSubmit={conversationIdForm.handleSubmit(onSubmit)}>
            <FormField
              control={conversationIdForm.control}
              disabled={conversation?.status === "resolved"}
              name="message"
              render={({ field }) => (
                <AIInputTextarea
                  disabled={
                    conversation?.status === "resolved" ||
                    conversationIdForm.formState.isSubmitting
                    //TODO: OR if enhancing prompt
                  }
                  onChange={field.onChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      conversationIdForm.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    conversation?.status === "resolved"
                      ? "This conversation is resolved"
                      : "Type your response as an operator..."
                  }
                  value={field.value}
                />
              )}
            />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton>
                  <Wand2 />
                  Enhance
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit
                disabled={
                  conversation?.status === "resolved" ||
                  !conversationIdForm.formState.isValid ||
                  conversationIdForm.formState.isSubmitting
                }
                status="ready"
                type="submit"
              />
            </AIInputToolbar>
          </AIInput>
        </Form>
      </div>
    </>
  );
};
export default ConversationIdForm;
