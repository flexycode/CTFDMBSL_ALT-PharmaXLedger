import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch user role from the database
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
    });

    if (!dbUser) {
        // Fallback if user exists in Auth but not in our User table yet
        redirect("/onboarding");
    }

    // Role-based redirection
    switch (dbUser.role) {
        case "MANUFACTURER":
            redirect("/dashboard/inventory");
        case "DISTRIBUTOR":
            redirect("/dashboard/shipments");
        case "PHARMACIST":
            redirect("/dashboard/verify");
        default:
            redirect("/dashboard/overview");
    }
}
