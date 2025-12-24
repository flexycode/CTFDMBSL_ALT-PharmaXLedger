"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Database, QrCode, FileCheck, Search, Activity } from "lucide-react";

export default function VerificationPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Authenticity Hub</h2>
                    <p className="text-slate-400">Verify drug integrity through the PharmaXLedger protocol.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-bold uppercase">
                    <Activity className="w-4 h-4 animate-pulse" /> Protocol Online
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Verification Action */}
                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-3xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20 group hover:scale-105 transition-transform">
                        <QrCode className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Scan Digital Signature</h3>
                    <p className="text-slate-400 max-w-sm mb-10 italic">
                        Point your terminal scanner at the drug package QR code to verify its provenance and custody history.
                    </p>
                    <div className="w-full flex items-center gap-4 bg-white/5 rounded-2xl p-2 border border-white/5">
                        <input
                            type="text"
                            placeholder="Enter Batch ID manually..."
                            className="flex-1 bg-transparent border-none outline-none px-4 text-sm"
                        />
                        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg">
                            Verify
                        </button>
                    </div>
                </div>

                {/* Verification Stats/Info */}
                <div className="space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-emerald-600/5 border border-emerald-500/20">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                <FileCheck className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h4 className="font-bold">Recent Verification: Success</h4>
                        </div>
                        <div className="bg-black/20 rounded-2xl p-4 font-mono text-[10px] text-emerald-400/80 space-y-1">
                            <p>HASH: 0x82f...a102</p>
                            <p>STATUS: GENUINE_AUTHENTICATED</p>
                            <p>STAKEHOLDER: Pharmacy-772</p>
                            <p>TIMESTAMP: {new Date().toISOString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <ShieldCheck className="w-6 h-6 text-blue-500 mb-3" />
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Global Health</p>
                            <p className="text-xl font-bold">100% Secure</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                            <Database className="w-6 h-6 text-amber-500 mb-3" />
                            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Total Ledger Entries</p>
                            <p className="text-xl font-bold">12,402</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
