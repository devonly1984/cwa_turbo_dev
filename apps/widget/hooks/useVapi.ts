import Vapi from "@vapi-ai/web";
import { useState,useEffect } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}
interface Message {
  role: "user" | "assistant";
  transcriptType: "final";
  transcript: string;
  type: "transcript";
}

export const useVapi = ()=>{
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        
        //Only for testing
        const vapiInstance = new Vapi(
          "add53d79-985c-47c6-800b-f5c0f0c0e6c5"
        );
        setVapi(vapiInstance);
        vapiInstance.on('call-start',()=>{
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([])
        })
        vapiInstance.on('call-end',()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        })
        vapiInstance.on('speech-start',()=>{
            setIsSpeaking(true);
        })
        vapiInstance.on('speech-end',()=>{
            setIsSpeaking(false);
        })
        vapiInstance.on("error", (error) => {
          console.log(error, "VAPI ERROR");
          setIsConnecting(false);
        });
        vapiInstance.on("message", (message: Message) => {
          if (
            message.type === "transcript" &&
            message.transcriptType === "final"
          ) {
            setTranscript((prev) => [
              ...prev,
              {
                role: message.role === "user" ? "user" : "assistant",
                text: message.transcript,
              },
            ]);
            return () => {
              vapiInstance?.stop();
            };
          }
        });

    }, []);
    const startCall = ()=>{
        setIsConnected(true);
        if (vapi) {
          //Only For testing
          vapi.start("55d57c59-c123-4fb6-a2d7-8f8a645c138c");
        }

    }
    const endCall = ()=>{
        if (vapi) {
            vapi.stop();
        }
    }
    return {
      isSpeaking,
      isConnecting,
      isConnected,
      transcript,
      startCall,
      endCall,
    };

}