"use client";

import { useVapi } from "@/hooks/useVapi";
import { Button } from "@workspace/ui/components/button";

const WidgetHomePage = () => {
  const {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall,
  } = useVapi();
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => startCall()}> Start Call</Button>
      <Button onClick={() => endCall()} variant={"destructive"}>
        End Call
      </Button>
      <p>isConnected: {`${isConnected}`}</p>
      <p>isConnecting: {`${isConnecting}`}</p>
      <p>isSpeaking: {`${isSpeaking}`}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
};
export default WidgetHomePage;
