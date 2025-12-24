"use client";

import { motion } from "framer-motion";
import { Truck, MapPin, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function ShipmentsPage() {
    const shipments = [
        { id: "SHP-9921", drug: "Humira", currentHolder: "Distributor Alpha", status: "In Transit", eta: "2h 15m", progress: 65 },
        { id: "SHP-4410", drug: "Keytruda", currentHolder: "Venedict Logistics", status: "Delivered", eta: "--", progress: 100 },
        { id: "SHP-1102", drug: "Eliquis", currentHolder: "Manufacturer Main", status: "Pending", eta: "Tomorrow", progress: 5 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Shipment Orchestration</h2>
                <p className="text-slate-400">Real-time tracking and verified handover logs.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {shipments.map((shipment, i) => (
                    <motion.div
                        key={shipment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-blue-500/30 transition-all group relative overflow-hidden"
                    >
                        {/* Status Background Glow */}
                        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] -z-10 transition-opacity opacity-0 group-hover:opacity-10 ${shipment.status === "Delivered" ? "bg-emerald-500/20" : "bg-blue-500/20"
                            }`} />

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center font-bold text-blue-500">
                                    <Truck className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{shipment.id}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${shipment.status === "Delivered" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                                            }`}>
                                            {shipment.status}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold">{shipment.drug}</h3>
                                    <p className="text-sm text-slate-400 flex items-center gap-2 mt-1 italic">
                                        <MapPin className="w-4 h-4" /> Currently at {shipment.currentHolder}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 max-w-md">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                                    <span>Progress</span>
                                    <span>{shipment.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${shipment.progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={`h-full ${shipment.status === "Delivered" ? "bg-emerald-500" : "bg-blue-600"}`}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-2 font-medium">
                                    <Clock className="w-3 h-3" /> Estimated Arrival: {shipment.eta}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-sm transition-all">
                                    Full Audit History
                                </button>
                                <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2">
                                    Verify Handover <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
