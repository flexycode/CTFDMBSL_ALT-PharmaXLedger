import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const CATEGORIES = [
  "Antibiotics",
  "Analgesics", 
  "Antivirals",
  "Antidiabetics",
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Supplements",
  "Other"
] as const;

export type Category = typeof CATEGORIES[number];

export const DOSAGE_FORMS = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Ointment",
  "Drops",
  "Inhaler",
  "Other"
] as const;

export type DosageForm = typeof DOSAGE_FORMS[number];

export const list = query({
  args: {
    search: v.optional(v.string()),
    filter: v.optional(v.union(v.literal("all"), v.literal("low_stock"), v.literal("expiring_soon")))
  },
  handler: async (ctx, args) => {
    await getAuthUserId(ctx);
    
    let medicines;
    if (args.search) {
      medicines = await ctx.db
        .query("medicines")
        .withSearchIndex("search_by_name", q => q.search("name", args.search!))
        .collect();
    } else {
      medicines = await ctx.db.query("medicines").collect();
    }
    
    if (args.filter === "low_stock") {
      medicines = medicines.filter(med => med.quantity <= med.minimumStock);
    } else if (args.filter === "expiring_soon") {
      const thirtyDaysFromNow = Date.now() + (30 * 24 * 60 * 60 * 1000);
      medicines = medicines.filter(med => med.expiryDate <= thirtyDaysFromNow);
    }
    
    return medicines;
  }
});

export const add = mutation({
  args: {
    name: v.string(),
    genericName: v.string(),
    batchNumber: v.string(),
    quantity: v.number(),
    expiryDate: v.number(),
    manufacturer: v.string(),
    location: v.string(),
    minimumStock: v.number(),
    unitPrice: v.number(),
    category: v.string(),
    dosageForm: v.string(),
    strength: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.db.insert("medicines", {
      ...args,
      createdBy: userId,
    });
  }
});

export const adjustStock = mutation({
  args: {
    medicineId: v.id("medicines"),
    type: v.union(v.literal("increase"), v.literal("decrease")),
    quantity: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const medicine = await ctx.db.get(args.medicineId);
    if (!medicine) throw new Error("Medicine not found");

    const newQuantity = args.type === "increase" 
      ? medicine.quantity + args.quantity
      : medicine.quantity - args.quantity;

    if (newQuantity < 0) throw new Error("Cannot reduce stock below 0");

    await ctx.db.patch(args.medicineId, { quantity: newQuantity });

    await ctx.db.insert("stockAdjustments", {
      medicineId: args.medicineId,
      type: args.type,
      quantity: args.quantity,
      reason: args.reason,
      batchNumber: medicine.batchNumber,
      adjustedBy: userId,
      adjustmentDate: Date.now(),
    });
  }
});

export const getInventoryStats = query({
  args: {},
  handler: async (ctx) => {
    await getAuthUserId(ctx);
    
    const medicines = await ctx.db.query("medicines").collect();
    
    const thirtyDaysFromNow = Date.now() + (30 * 24 * 60 * 60 * 1000);
    
    return {
      totalValue: medicines.reduce((sum, med) => sum + (med.quantity * med.unitPrice), 0),
      totalItems: medicines.length,
      lowStockCount: medicines.filter(med => med.quantity <= med.minimumStock).length,
      expiringSoonCount: medicines.filter(med => med.expiryDate <= thirtyDaysFromNow).length
    };
  }
});
