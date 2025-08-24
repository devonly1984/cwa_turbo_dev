import { action } from "../../_generated/server.js";
import { v } from "convex/values";
import { getIdentify } from "../../lib/convexUtils.js";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const enhanceResponse = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const { orgId } = await getIdentify(ctx);
  console.log(orgId);
    const response = await generateText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content:
            "Enhance the operator's message to be more professional, clear, and helpful while maintaing their intent and key information. ",
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