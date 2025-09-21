"use client";

import { errorMessageAtom } from "@/store/widgetAtoms";
import { useAtomValue } from "jotai";
import WidgetHeader from "../layouts/WidgetHeader";
import { AlertTriangle } from "lucide-react";

const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangle className="" />
        <p className="text-sm">
          {errorMessage || "Invalid Configuration"}
        </p>
      </div>
    </>
  );
};
export default WidgetErrorScreen;
