import { useAtomValue,  } from "jotai";
import WidgetForm from "../forms/WidgetForm";
import { WidgetHeader } from "../layout";
import {  organizationIdAtom } from "../store/widgetAtom";

const WidgetAuthScreen = () => {
  const organizationId = useAtomValue(organizationIdAtom)
  
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <WidgetForm organizationId={organizationId} />
    </>
  );
};
export default WidgetAuthScreen;
