import { action } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { v } from "convex/values";
import {generateText} from "ai"
import {openai} from '@ai-sdk/openai'
import { OPERATOR_MESSAGE_ENHANCEMENT_PROMPT } from "@workspace/backend/constants/index.js";
export const enhanceResponse = action({
  args: {
    prompt: v.string(),
   
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentity(ctx);
    const response = await generateText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content: OPERATOR_MESSAGE_ENHANCEMENT_PROMPT,
        },
        {
          role: "user",
          content: args.prompt,
        },
      ],
    });
    return response.text;
  },
});