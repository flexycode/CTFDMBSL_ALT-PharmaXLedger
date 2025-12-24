"use client";

import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck, AlertCircle, ArrowUpRight } from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        { label: "Total Batches", val: "152", icon: Package, change: "+12.5%", trend: "up" },
        { label: "In Transit", val: "48", icon: Truck, change: "8 Active", trend: "neutral" },
        { label: "Verified Genuine", val: "99.9%", icon: ShieldCheck, change: "+0.1%", trend: "up" },
        { label: "Safety Alerts", val: "0", icon: AlertCircle, change: "Clear", trend: "neutral" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">System Overview</h2>
                <p className="text-slate-400">Live orchestration of the pharmaceutical supply chain.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl hover:border-blue-500/30 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-400"
                                }`}>
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.val}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-3xl bg-white/[0.03] border border-white/5 min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold">Recent Ledger Activity</h3>
                        <button className="text-sm text-blue-500 hover:underline flex items-center gap-1 font-semibold">
                            Full Audit Trail <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {[
                            { drug: "Humira", batch: "BATCH-88219", action: "Handover Verified", stakeholder: "Distributor A", time: "2m ago" },
                            { drug: "Eliquis", batch: "BATCH-44120", action: "Manufactured", stakeholder: "Manufacturer Pharma", time: "1h ago" },
                            { drug: "Ketruyda", batch: "BATCH-11204", action: "Dispensed", stakeholder: "Pharmacy Central", time: "3h ago" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-500 text-xs shadow-sm">
                                        {item.drug[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold">{item.drug} <span className="text-slate-500 font-normal text-xs ml-2 tracking-widest">{item.batch}</span></p>
                                        <p className="text-xs text-slate-400 italic">{item.action} by {item.stakeholder}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 italic uppercase font-bold tracking-tighter">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/20 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Integrity Report</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
                            All transactions have been cryptographically signed and stored in the central ledger. No anomalies detected.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[95%] bg-blue-600" />
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Database Health: Optimal</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
