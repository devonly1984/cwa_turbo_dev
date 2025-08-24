"use client";

import WidgetView from "@/components/widget/views/WidgetView";
import { useVapi } from "@/hooks/useVapi";
import { Button } from "@workspace/ui/components/button";
import { use } from "react";
interface Props {
  searchParams: Promise<{ organizationId: string }>;
}
const WidgetHomePage = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);
  const {
    transcript,
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    endCall,
  } = useVapi();

  return <WidgetView organizationId={organizationId} />;
};
export default WidgetHomePage;
