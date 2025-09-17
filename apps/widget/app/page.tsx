"use client"
import { useVapi } from "@/hooks/useVapi";
import { Button } from "@workspace/ui/components/button";

const WidgetHomePage = () => {
const {
  isSpeaking,
  isConnecting,
  isConnected,
  transcript,
  startCall,
  endCall,
} = useVapi();
  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={() => startCall()}>Start Call</Button>
      <Button onClick={() => endCall()} variant={"destructive"}>
        End Call
      </Button>
      <p>IsConnected: {`${isConnected}`}</p>
      <p>isConnecting: {`${isConnecting}`}</p>
      <p>isSpeaking: {`${isSpeaking}`}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
};
export default WidgetHomePage;
