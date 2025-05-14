import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("shipped"),
      v.literal("delivered")
    )),
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    const query = ctx.db.query("orders");
    if (args.status) {
      return await query.withIndex("by_status", q => 
        q.eq("status", args.status as "pending" | "approved" | "rejected" | "shipped" | "delivered")
      ).collect();
    }
    return await query.collect();
  },
});

export const create = mutation({
  args: {
    items: v.array(v.object({
      medicineId: v.id("medicines"),
      quantity: v.number(),
      batchNumber: v.string(),
    })),
    deliveryLocation: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Calculate total amount
    let totalAmount = 0;
    for (const item of args.items) {
      const medicine = await ctx.db.get(item.medicineId);
      if (!medicine) throw new Error("Medicine not found");
      totalAmount += medicine.unitPrice * item.quantity;
    }
    
    return await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      requestedBy: userId,
      requestDate: Date.now(),
      totalAmount,
    });
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("shipped"),
      v.literal("delivered")
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(args.orderId, {
      status: args.status,
      approvedBy: userId,
      approvalDate: Date.now(),
    });
  },
});
