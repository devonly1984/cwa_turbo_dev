import Vapi from '@vapi-ai/web';
import { useEffect,useState } from 'react';


interface TranscriptMessage  {
    role: 'user'|'assistant';
    text:string;
}

export const useVapi = ()=>{
    const [isConnecting, setIsConnecting] = useState(false)
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);


    useEffect(()=>{
        const vapiInstance = new Vapi('add53d79-985c-47c6-800b-f5c0f0c0e6c5');
        setVapi(vapiInstance);
        vapiInstance.on('call-start',()=>{
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        })
        vapiInstance.on('call-end',()=>{
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false)
        });
        vapiInstance.on('speech-start',()=>{
            setIsSpeaking(true);
        })
        vapiInstance.on('speech-end',()=>{
            setIsSpeaking(false);
        })
        vapiInstance.on('error',()=>{
            setIsConnecting(false);
        })
        vapiInstance.on('message',(message)=>{
            if (message.type==='transcript' && message.transcriptType==='final'){
                setTranscript((prev) => [
                  ...prev,
                  {
                    role: message.role === "user" ? "user" : "assistant",
                    text: message.transcript,
                  },
                ]);


            }
        })
        return ()=>{
            vapiInstance?.stop();
        }
    },[])
    const startCall = ()=>{
        setIsConnecting(true);
        if (vapi) {
            vapi.start('55d57c59-c123-4fb6-a2d7-8f8a645c138c')
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