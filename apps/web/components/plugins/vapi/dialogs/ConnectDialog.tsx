"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import VapiPluginForm from "../forms/VapiPluginForm";

interface ConnectDialogProps {
    open:boolean;
    setOpen:(open:boolean)=>void;
}

const ConnectDialog = ({ open, setOpen }: ConnectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enable Vapi</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Your API keys are safely encrypted and store using AWS Secrets
          Manager
        </DialogDescription>
        <VapiPluginForm open={open} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default ConnectDialog