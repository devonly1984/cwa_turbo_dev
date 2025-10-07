import { Feature } from "@/types";
import { Globe, Phone, PhoneCall, Workflow } from "lucide-react";

export const vapiFeatures: Feature[] = [
  {
    icon: Globe,
    label: "Web voice calls",
    description: "Voice Chat directly in your app",
  },
  {
    icon: Phone,
    label: "Phone numbers",
    description: "Get dedicated business lines",
  },
  {
    icon: PhoneCall,
    label: "Outbound calls",
    description: "Automated customer outreach",
  },
  {
    icon: Workflow,
    label: "Workflows",
    description: "Custom Conversation flows",
  },
];