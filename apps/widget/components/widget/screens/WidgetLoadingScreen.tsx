"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { Loader } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "../atoms/WidgetAtoms";
import { WidgetHeader } from "../layout";
import { useEffect, useState } from "react";
import { InitStep } from "@/types";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
interface WidgetLoadingScreenProps {
  organizationId: string | null;
}
const WidgetLoadingScreen = ({
  organizationId,
}: WidgetLoadingScreenProps) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  //setters
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const setOrganizationIdAtom = useSetAtom(organizationIdAtom);

  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const validateOrganization = useAction(
    api.public.actions.organizations.validate
  );
  useEffect(() => {
    if (step !== "org") {
      return;
    }
    setLoadingMessage("Loading Organization ID");

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }
    setLoadingMessage("Verifying organization...");
    validateOrganization({ organizationId })
      .then((res) => {
        if (res.valid) {
          setOrganizationIdAtom(organizationId);
          setStep("session");
        } else {
          setErrorMessage(res.reason || "Invalid Configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });
  }, [step, organizationId]);
  const validateContactSession = useMutation(
    api.public.mutations.contactSessions.validate
  );
  useEffect(() => {
    if (step !== "session") {
      return;
    }
    setLoadingMessage("Finding contact session ID");
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }
    setLoadingMessage("Validating Session");
    validateContactSession({
      contactSessionId,
    })
      .then((res) => {
  
        setSessionValid(res.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [step, contactSessionId, validateContactSession, setLoadingMessage]);
  useEffect(() => {
    if (step !== "done") {
      return;
    }
 
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <Loader className="animate-spin" />
        <p className="text-sm">{loadingMessage || "Loading..."}</p>
      </div>
    </>
  );
};
export default WidgetLoadingScreen;
