"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function registerBatch(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const batchNumber = formData.get("batchNumber") as string;
    const expiryDate = new Date(formData.get("expiryDate") as string);
    const manufacturerId = user.id;

    try {
        const drug = await prisma.drug.create({
            data: {
                name,
                sku,
                batchNumber,
                expiryDate,
                manufacturerId,
                ledgerEntries: {
                    create: {
                        userId: manufacturerId,
                        action: "MANUFACTURED",
                        details: `Initial batch registration for ${name}`,
                        location: "Factory Node Alpha",
                    }
                }
            }
        });

        revalidatePath("/dashboard/inventory");
        return { success: true, drug };
    } catch (error: any) {
        console.error("Prisma Error:", error);
        return { success: false, error: "Failed to register batch." };
    }
}
