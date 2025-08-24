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

import { zodResolver } from "@hookform/resolvers/zod";
import { WidgetHeader } from "../layout";
import {
  authScreenSchema,
  AuthScreenSchema,
} from "@/schemas/authScreenForm";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";

import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, organizationIdAtom, screenAtom } from "../atoms/WidgetAtoms";

const WidgetAuthScreen = () => {
const organizationId = useAtomValue(organizationIdAtom);
const setContactSessionId = useSetAtom(
  contactSessionIdAtomFamily(organizationId || "")
);
const setScreen = useSetAtom(screenAtom);
  const authForm = useForm<AuthScreenSchema>({
    resolver: zodResolver(authScreenSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const createContactSession = useMutation(
    api.public.mutations.contactSessions.create
  );
  const onSubmit = async (values: AuthScreenSchema) => {
    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages.join(","),
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
    const contactSessionId = await createContactSession({
      ...values,
      metadata,
      organizationId: organizationId || "",
    });
    setContactSessionId(contactSessionId);
    setScreen('selection')
    

  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <Form {...authForm}>
        <form
          className="flex flex-1 flex-col gap-y-4 p-4"
          onSubmit={authForm.handleSubmit(onSubmit)}
        >
          <FormField
            name="name"
            control={authForm.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="h-10 bg-background"
                    placeholder="e.g. John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={authForm.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="h-10 bg-background"
                    placeholder="test@test.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={authForm.formState.isSubmitting}
            size={"lg"}
          >
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};
export default WidgetAuthScreen;
