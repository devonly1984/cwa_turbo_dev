"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "react-hook-form";
import { chatFormSchema, ChatFormSchema } from "@/lib/schemas/ChatFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import {api} from '@workspace/backend/_generated/api'
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, organizationIdAtom, screenAtom } from "@/store/widgetAtoms";

const WidgetChatForm = () => {
  //ATOMS
  const organizationId = useAtomValue(organizationIdAtom);
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId || "")
  );
//SETTERS
const setScreen = useSetAtom(screenAtom);
//Mutation
    const createContactSession = useMutation(
      api.public.mutations.contactSessions.create
    );
    const chatForm = useForm<ChatFormSchema>({
        resolver: zodResolver(chatFormSchema),
        defaultValues: {
            name:"",
            email: "",
           
        }
    })
    const onSubmit = async (values: ChatFormSchema) => {
      if (!organizationId) {
        return;
      }
      const metadata: Doc<"contactSessions">["metadata"] = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages?.join(","),
        platform: navigator.platform,
        vendor: navigator.vendor,
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        cookieEnabled: navigator.cookieEnabled,
        referrer: document.referrer || "direct",
        currentUrl: window.location.href,
      };
      const contactSessionId =
        await createContactSession({
          ...values,
          metadata,
          organizationId,
        });
      
      setContactSessionId(contactSessionId);
      setScreen("selection");
    };
  return (
    <Form {...chatForm}>
      <form
        onSubmit={chatForm.handleSubmit(onSubmit)}
        className="flex flex-col flex-1 gap-y-4 p-4"
      >
        <FormField
          name="name"
          control={chatForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 bg-background"
                  placeholder="John Doe"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={chatForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 bg-background"
                  placeholder="test@example.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={chatForm.formState.isSubmitting}
          size={"lg"}
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};
export default WidgetChatForm;
