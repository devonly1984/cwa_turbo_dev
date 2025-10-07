"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ConnectDialogSchema,connectDialogSchema } from "@/lib/schemas/connectDialogSchema";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
interface VapiPluginFormProps {
  open: boolean;
  setOpen: (open:boolean)=>void;
}
const VapiPluginForm = ({open,setOpen}:VapiPluginFormProps) => {
    const upsertSecret = useMutation(api.private.mutations.secrets.upsert);
    const pluginForm = useForm<ConnectDialogSchema>({
      resolver: zodResolver(connectDialogSchema),
      defaultValues: {
        publicApiKey: "",
        privateApiKey: "",
      },
    });
    const onSubmit = async(values:ConnectDialogSchema)=>{
      try {
        await upsertSecret({
          service: "vapi",
          value: {
            publicApiKey: values.publicApiKey,
            privateApiKey: values.privateApiKey,
          },
        });
        setOpen(false);
        toast.success("Vapi Plugin added")
      } catch (error) {
        console.log(error);
        toast.error("Something wwent wrong")
      }
    }
  return (
    <Form {...pluginForm}>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={pluginForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={pluginForm.control}
          name="publicApiKey"
          render={({ field }) => (
            <FormItem>
              <Label>Public API Key</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your public API key"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={pluginForm.control}
          name="privateApiKey"
          render={({ field }) => (
            <FormItem>
              <Label>Private API Key</Label>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Your private API key"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pluginForm.formState.isSubmitting} type="submit">
          {pluginForm.formState.isSubmitting ? "Connecting..." : "Connect"}
        </Button>
      </form>
    </Form>
  );
};
export default VapiPluginForm