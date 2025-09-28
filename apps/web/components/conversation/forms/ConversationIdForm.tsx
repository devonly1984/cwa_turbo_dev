"use client";
import {
  conversationIdViewSchema,
  ConversationIdViewSchema,
} from "@/lib/schemas/conversationIdViewSchema";
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
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { DiceBearAvatar } from "@workspace/ui/components/shared";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";
interface ConversationIdFormProps {
  conversationId: Id<"conversations">;
}
const ConversationIdForm = ({
  conversationId,
}: ConversationIdFormProps) => {
  const conversation = useQuery(api.private.queries.conversations.getOne, {
    conversationId,
  });
  const isResolved = conversation?.status==='resolved'
  const messages = useThreadMessages(
    api.private.queries.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );
  const IdForm = useForm<ConversationIdViewSchema>({
    resolver: zodResolver(conversationIdViewSchema),
    defaultValues: {
      message: "",
    },
  });
  const createMessage = useMutation(api.private.mutations.messages.create);
  const onSubmit = async (values: ConversationIdViewSchema) => {
   try {
    await createMessage({
      conversationId,
      prompt: values.message,
    });
    IdForm.reset();
   } catch (error) {
    toast.error(`Something went wrong ${error}`);
   }
  };
 
  return (
    <>
      <AIConversation className="max-h-[calc(100vh-180px)]">
        <AIConversationContent>
          {toUIMessages(messages.results ?? []).map((message) => (
            <AIMessage
              key={message.id}
              from={message.role === "user" ? "assistant" : "user"}
            >
              <AIMessageContent>
                <AIResponse>{message.text}</AIResponse>
              </AIMessageContent>
              {message.role === "user" && (
                <DiceBearAvatar
                  seed={conversation?.contactSessionId ?? "user"}
                  size={32}
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>
      <div className="p-2">
        <Form {...IdForm}>
          <AIInput onSubmit={IdForm.handleSubmit(onSubmit)}>
            <FormField
              control={IdForm.control}
              name="message"
              disabled={isResolved}
              render={({ field }) => (
                <AIInputTextarea
                  disabled={isResolved || IdForm.formState.isSubmitting}
                  //TODO: Enhancing prompt
                  onChange={field.onChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.shiftKey) {
                      e.preventDefault();
                      IdForm.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    isResolved
                      ? "This conversation has been resolved"
                      : "Type your response as an operator"
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
                  isResolved ||
                  !IdForm.formState.isValid ||
                  IdForm.formState.isSubmitting
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
