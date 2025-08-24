'use client'
import { messageFormSchema, MessageFormSchema } from "@/schemas/messageFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/convex/_generated/api";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { AIInput, AIInputSubmit, AIInputTextarea, AIInputToolbar, AIInputTools } from "@workspace/ui/components/ai/input";
import { Form, FormField } from "@workspace/ui/components/form";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
interface ChatFormProps {
  conversation:
    | {
        _id: Id<"conversations">;
        status: "unresolved" | "escalated" | "resolved";
        threadId: string;
      }
    | undefined;
  contactSessionId: Id<"contactSessions"> | null;
}
const ChatForm = ({ conversation, contactSessionId }: ChatFormProps) => {
  const createMessage = useAction(api.public.actions.messages.create);
  const onSubmit = async (values: MessageFormSchema) => {
    if (!conversation || !contactSessionId) {
      return;
    }
    messageForm.reset();
    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    });
  };
  const messageForm = useForm<MessageFormSchema>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });
  return (
    <Form {...messageForm}>
      <AIInput
        className="rounded-none border-x-0 border-b-0"
        onSubmit={messageForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={messageForm.control}
          name="message"
          disabled={conversation?.status === "resolved"}
          render={({ field }) => (
            <AIInputTextarea
              disabled={conversation?.status === "resolved"}
              onChange={field.onChange}
              onKeyDown={(e) => {
                if (e.key === "enter" && !e.shiftKey) {
                  e.preventDefault();
                  messageForm.handleSubmit(onSubmit)();
                }
              }}
              placeholder={
                conversation?.status === "resolved"
                  ? "This conversation has been resolved"
                  : "Type your message..."
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
              !messageForm.formState.isValid
            }
            status="ready"
            type="submit"
          />
        </AIInputToolbar>
      </AIInput>
    </Form>
  );
};
export default ChatForm