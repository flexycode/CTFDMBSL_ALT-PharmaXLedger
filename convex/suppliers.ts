import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    status: v.optional(v.union(
      v.literal("active"),
      v.literal("inactive")
    )),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    const query = ctx.db.query("suppliers");
    if (args.status) {
      return await query.withIndex("by_status", q => 
        q.eq("status", args.status as "active" | "inactive")
      ).collect();
    }
    return await query.collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    contactPerson: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    categories: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.db.insert("suppliers", {
      ...args,
      status: "active",
      createdBy: userId,
    });
  },
});

export const updateStatus = mutation({
  args: {
    supplierId: v.id("suppliers"),
    status: v.union(v.literal("active"), v.literal("inactive")),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    await ctx.db.patch(args.supplierId, { status: args.status });
  },
});
