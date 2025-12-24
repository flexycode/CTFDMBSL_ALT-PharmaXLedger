"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Package,
    Truck,
    ShieldCheck,
    Settings,
    LogOut,
    Search,
    Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Inventory", icon: Package, href: "/dashboard/inventory" },
        { name: "Shipments", icon: Truck, href: "/dashboard/shipments" },
        { name: "Verifications", icon: ShieldCheck, href: "/dashboard/verify" },
        { name: "System Settings", icon: Settings, href: "/dashboard/settings" },
    ];

    return (
        <div className="flex min-h-screen bg-[#020617] text-white">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl flex flex-col p-6 fixed h-full z-20">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        PX
                    </div>
                    <div>
                        <h1 className="font-bold tracking-tight">PharmaXLedger</h1>
                        <p className="text-[10px] text-blue-500 uppercase font-bold tracking-[0.2em]">Secure Node</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                        ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                                        : "text-slate-500 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button className="flex items-center gap-3 px-4 py-3 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all mt-auto">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-72">
                {/* Header */}
                <header className="h-20 border-b border-white/5 bg-white/[0.01] backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-2 w-96 border border-white/5">
                        <Search className="w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search Ledger (SKU, Transaction ID...)"
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold">Dr. Venedict</p>
                                <p className="text-[10px] text-blue-500 font-bold uppercase">Manufacturer</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Venedict&background=020617&color=3b82f6" alt="Profile" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Overflow */}
                <div className="p-8">
                    {children}
                </div>
            </main>

            {/* Ambient Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-[20%] w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </div>
    );
}
