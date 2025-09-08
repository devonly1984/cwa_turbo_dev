import {
  widgetFormSchema,
  type WidgetFormSchema,
} from "@/lib/schemas/WidgetFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../packages/backend/convex/_generated/api";
import { Doc, Id } from "../../../../../packages/backend/convex/_generated/dataModel";
import { useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, screenAtom } from "../store/widgetAtom";
interface WidgetFormProps {
  organizationId:string|null
}
const WidgetForm = ({ organizationId }: WidgetFormProps) => {
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const setScreen = useSetAtom(screenAtom);
  const authForm = useForm<WidgetFormSchema>({
    resolver: zodResolver(widgetFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createContactSession = useMutation(
    api.public.mutations.contactSessions.create
  );
  const onSubmit = async (values: WidgetFormSchema) => {
    if (!organizationId) {
      return;
    }
    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewPortSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookiesEnabled: navigator.cookieEnabled,
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    };
    const contactSessionId =
      await createContactSession({
        ...values,
        organizationId,
        metadata,
      });
   setContactSessionId(contactSessionId);
   setScreen('chat');
  };
  return (
    <Form {...authForm}>
      <form
        className="flex flex-1 flex-col gap-y-4 p-4"
        onSubmit={authForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={authForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 bg-background"
                  placeholder="e.g. John Doe"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={authForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-10 bg-background"
                  placeholder="e.g. john@example.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={authForm.formState.isSubmitting}
          size="lg"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default WidgetForm;
