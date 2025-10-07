import { Agent } from "@convex-dev/agent";
import { components } from "@workspace/backend/_generated/api.js";
import { openai } from "@ai-sdk/openai";
import { SUPPORT_AGENT_PROMPT } from "@workspace/backend/constants/index.js";


export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: SUPPORT_AGENT_PROMPT,
});