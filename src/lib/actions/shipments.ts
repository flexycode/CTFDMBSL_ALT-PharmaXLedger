"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function transferCustody(shipmentId: string, details?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    try {
        const shipment = await prisma.shipment.update({
            where: { id: shipmentId },
            data: {
                currentHolderId: user.id,
                status: "IN_TRANSIT",
                ledgerEntries: {
                    create: {
                        userId: user.id,
                        action: "RECEIVED_HANDOVER",
                        details: details || "Verified physical receipt of batch.",
                        location: "Logistics Hub B",
                        drugId: (await prisma.shipment.findUnique({ where: { id: shipmentId } }))?.drugId || ""
                    }
                }
            }
        });

        revalidatePath("/dashboard/shipments");
        return { success: true, shipment };
    } catch (error: any) {
        console.error("Transfer Error:", error);
        return { success: false, error: "Custody transfer failed." };
    }
}
