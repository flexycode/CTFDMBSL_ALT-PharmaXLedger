import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  medicines: defineTable({
    name: v.string(),
    genericName: v.string(),
    batchNumber: v.string(),
    quantity: v.number(),
    expiryDate: v.number(),
    manufacturer: v.string(),
    location: v.string(),
    minimumStock: v.number(),
    unitPrice: v.number(),
    createdBy: v.id("users"),
    category: v.optional(v.string()),
    dosageForm: v.optional(v.string()),
    strength: v.optional(v.string()),
    description: v.optional(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_expiry", ["expiryDate"])
    .index("by_category", ["category"])
    .index("by_batch", ["batchNumber"])
    .searchIndex("search_by_name", {
      searchField: "name",
      filterFields: ["category"]
    }),

  stockAdjustments: defineTable({
    medicineId: v.id("medicines"),
    type: v.union(v.literal("increase"), v.literal("decrease")),
    quantity: v.number(),
    reason: v.string(),
    batchNumber: v.string(),
    adjustedBy: v.id("users"),
    adjustmentDate: v.number(),
    notes: v.optional(v.string()),
  }).index("by_medicine", ["medicineId"]),

  orders: defineTable({
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("shipped"),
      v.literal("delivered")
    ),
    requestedBy: v.id("users"),
    approvedBy: v.optional(v.id("users")),
    items: v.array(
      v.object({
        medicineId: v.id("medicines"),
        quantity: v.number(),
        batchNumber: v.optional(v.string()),
      })
    ),
    deliveryLocation: v.string(),
    requestDate: v.number(),
    approvalDate: v.optional(v.number()),
    notes: v.optional(v.string()),
    totalAmount: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_requester", ["requestedBy"]),

  suppliers: defineTable({
    name: v.string(),
    contactPerson: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdBy: v.id("users"),
    categories: v.optional(v.array(v.string())),
  }).index("by_status", ["status"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
