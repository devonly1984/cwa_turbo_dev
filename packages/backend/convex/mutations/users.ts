import { v } from "convex/values";
import { mutation } from "../_generated/server.js";


export const add = mutation({
    args: {},
    handler: async(ctx)=>{
        const userId = await ctx.db.insert("users", {
          name: "Test",
        });
        return userId;
    }
}


)