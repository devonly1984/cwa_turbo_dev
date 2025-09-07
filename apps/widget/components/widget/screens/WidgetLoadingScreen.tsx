"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { Loader } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/components/widget/store/widgetAtom";
import { WidgetHeader } from "@/components/widget/layout";
import { useEffect, useState } from "react";
import { InitStep } from "@/types";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { Id } from "@workspace/backend/convex/_generated/dataModel";

interface WidgetLoadingScreenProps {
  organizationId: string | null;
}

const WidgetLoadingScreen = ({
  organizationId,
}: WidgetLoadingScreenProps) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  //Setters
  const setScreen = useSetAtom(screenAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const validateOrganization = useAction(
    api.public.actions.organizations.validate
  );

  //First Step org to session
  useEffect(() => {
    if (step !== "org") {
      return;
    }
    setLoadingMessage("Loading Organization Id");
    if (!organizationId) {
      setErrorMessage("Organization Id is required");
      setScreen("error");
      return;
    }
    setLoadingMessage("Verifying Organization...");
    validateOrganization({ organizationId })
      .then((res) => {
        if (res.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(res.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });
  }, [
    setOrganizationId,
    setStep,
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    validateOrganization,
    setLoadingMessage,
  ]);

  //Second Step Validate session
  const validateContactSession = useMutation(
    api.public.mutations.contactSessions.validate
  );
  useEffect(() => {
    if (step !== "session") {
      return;
    }

    setLoadingMessage("Finding contact session ID...");
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }
    setLoadingMessage("Validating session...");
    validateContactSession({
      contactSessionId: contactSessionId,
    })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("done");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      });
  }, [step, contactSessionId, validateContactSession, setLoadingMessage]);

  //Step 3
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
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
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
