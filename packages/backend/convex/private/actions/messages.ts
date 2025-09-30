import { action } from "@workspace/backend/_generated/server.js";
import { getIdentity } from "@workspace/backend/lib/convexUtils.js";
import { v } from "convex/values";
import {generateText} from "ai"
import {openai} from '@ai-sdk/openai'
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
          content:
            "Enhance the operators message to be more professional,clear and helpful while maintaining their intent and key information",
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