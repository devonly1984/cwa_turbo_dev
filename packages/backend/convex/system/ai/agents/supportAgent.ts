import { Agent } from "@convex-dev/agent";
import { components } from "@workspace/backend/_generated/api.js";
import { openai } from "@ai-sdk/openai";

export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  languageModel: openai.chat("gpt-4o-mini"),
  instructions: "You are a customer support agent",
});