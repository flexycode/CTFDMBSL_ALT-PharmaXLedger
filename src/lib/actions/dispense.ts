"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function dispenseDrug(drugId: string, patientRef?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    try {
        // 1. Locate the drug and verify it's not already dispensed
        const drug = await prisma.drug.findUnique({
            where: { id: drugId },
            include: { ledgerEntries: true }
        });

        if (!drug) throw new Error("Drug not found");

        const alreadyDispensed = drug.ledgerEntries.some(e => e.action === "DISPENSED");
        if (alreadyDispensed) throw new Error("Drug already dispensed");

        // 2. Create the final ledger entry
        await prisma.ledgerEntry.create({
            data: {
                drugId,
                userId: user.id,
                action: "DISPENSED",
                details: `Dispensed to patient ref: ${patientRef || "Anonymous"}`,
                location: "Certified Pharmacy Hub",
            }
        });

        revalidatePath("/dashboard/verify");
        return { success: true };
    } catch (error: any) {
        console.error("Dispense Error:", error);
        return { success: false, error: error.message || "Failed to dispense drug." };
    }
}
