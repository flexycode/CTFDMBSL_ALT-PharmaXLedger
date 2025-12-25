"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    MapPin,
    Calendar,
    Package,
    Truck,
    CheckCircle2,
    AlertTriangle,
    ArrowLeft,
    Activity
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TrackPage() {
    const { id } = useParams();

    // Mock data for the visual timeline
    const journey = [
        {
            status: "Dispensed",
            location: "Pharmacy Central Hub",
            date: "Oct 24, 2025",
            time: "10:30 AM",
            description: "Confirmed delivery to end-patient.",
            icon: CheckCircle2,
            active: true,
            completed: true
        },
        {
            status: "Received",
            location: "Pharma-Logic Hub B",
            date: "Oct 22, 2025",
            time: "02:15 PM",
            description: "Verified physical receipt and storage requirements.",
            icon: MapPin,
            active: false,
            completed: true
        },
        {
            status: "In Transit",
            location: "Global Logistics Corridor",
            date: "Oct 20, 2025",
            time: "09:00 AM",
            description: "Shipment initiated and cryptographic identity locked.",
            icon: Truck,
            active: false,
            completed: true
        },
        {
            status: "Manufactured",
            location: "Factory Node Alpha",
            date: "Oct 18, 2025",
            time: "11:45 PM",
            description: "Batch quality control passed and ledger entry created.",
            icon: Package,
            active: false,
            completed: true
        },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Protocol
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    Verified Identity
                                </span>
                                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    Chain-In-Tact
                                </span>
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight mb-4">Drug Provenance Ledger</h1>
                            <p className="text-slate-400 text-lg leading-relaxed italic">
                                Scanning Batch ID: <span className="text-white font-mono font-bold not-italic">{id}</span>
                            </p>
                        </div>

                        {/* Visual Timeline */}
                        <div className="relative space-y-8 pl-8">
                            {/* Timeline Connector Line */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-600 via-blue-600/20 to-transparent" />

                            {journey.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative group"
                                >
                                    {/* Step Dot */}
                                    <div className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-4 border-[#020617] z-10 flex items-center justify-center ${step.active ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]" : "bg-slate-800"
                                        }`}>
                                        {step.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>

                                    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:border-blue-500/30 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <step.icon className={`w-5 h-5 ${step.active ? "text-blue-500" : "text-slate-500"}`} />
                                                <h3 className="text-xl font-bold">{step.status}</h3>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {step.date}</span>
                                                <span className="flex items-center gap-1.5 text-blue-500/80 italic">{step.time}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{step.description}</p>
                                        <p className="text-[10px] text-slate-600 font-mono flex items-center gap-2">
                                            <MapPin className="w-3 h-3" /> NODE: {step.location}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Side Panel: Authenticity Card */}
                    <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-blue-600/5 border border-blue-500/20 sticky top-12">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                                <ShieldCheck className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Integrity Report</h2>
                            <p className="text-sm text-slate-400 mb-8 leading-relaxed italic">
                                This medication has been tracked throughout its lifecycle with cryptographic signatures for every handover event.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-3">Status: Authentic</p>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1 }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold">Ledger Verified</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-mono break-all">
                                        SIG: 0x921b72...883c
                                    </p>
                                </div>

                                <button className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-slate-200 transition-all shadow-lg">
                                    Report Anomaly
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
