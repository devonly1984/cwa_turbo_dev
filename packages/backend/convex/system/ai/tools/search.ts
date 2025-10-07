import {openai} from '@ai-sdk/openai';
import { createTool } from '@convex-dev/agent';
import { generateText } from 'ai';

import z from 'zod';
import { internal } from '@workspace/backend/_generated/api.js';
import { supportAgent } from '../agents/supportAgent.js';
import rag from '../rag.js';
import { ConvexError } from 'convex/values';
import { SEARCH_INTERPRETER_PROMPT } from '@workspace/backend/constants/index.js';


export const search = createTool({
    description: "Search the knowledge base for relevant information to help answer user questions",
    args: z.object({
        query: z.string().describe("The search query to find relevant information")
    }),
    handler: async(ctx,args)=>{
        if (!ctx.threadId) {
            throw new ConvexError({
                code: "NOT_FOUND",
                message: "Thead Id not found"
            })
        }
        const conversation = await ctx.runQuery(
          internal.system.queries.conversations.getByThreadId,
          {
            threadId: ctx.threadId,
          }
        );

        if (!conversation) {
            throw new ConvexError({
              code: "NOT_FOUND",
              message: "Conversation not found",
            });
        }
        const orgId = conversation.organizationId;
        const searchResult = await rag.search(ctx, {
          namespace: orgId,
          query: args.query,
          limit: 5,
        });
        const contextText = `Found results in ${searchResult.entries
          .map((e) => e.title || null)
          .filter((t) => t !== null)
          .join(", ")} Here is the context:\n\n ${searchResult.text}`;
          const response = await generateText({
            messages: [
              {
                role: "system",
                content: SEARCH_INTERPRETER_PROMPT,
              },
              {
                role: "user",
                content: `User asked: "${args.query}"\n\nSearch results: ${contextText}`,
              },
            ],
            model: openai.chat("gpt-4o-mini"),
          });
          await supportAgent.saveMessage(ctx, {
            threadId: ctx.threadId,
            message: {
              role: "assistant",
              content: response.text,
            },
          });
          return response.text;
    }
})