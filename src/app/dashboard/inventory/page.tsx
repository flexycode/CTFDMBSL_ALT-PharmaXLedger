"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, Download, QrCode } from "lucide-react";
import { QRModal } from "@/components/dashboards/QRModal";

export default function InventoryPage() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedQR, setSelectedQR] = useState<{ id: string; name: string } | null>(null);

    const drugs = [
        { id: "1", name: "Humira", sku: "ADAL-40MG", batch: "BATCH-X001", expiry: "2026-12-01", status: "In Storage" },
        { id: "2", name: "Keytruda", sku: "PEMB-100MG", batch: "BATCH-Y022", expiry: "2025-08-15", status: "Shipped" },
        { id: "3", name: "Eliquis", sku: "APIX-5MG", batch: "BATCH-Z104", expiry: "2027-01-20", status: "In Storage" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Pharmaceutical Inventory</h2>
                    <p className="text-slate-400">Manage batches and initiate shipments to the supply chain.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                    <Plus className="w-5 h-5" /> Register New Batch
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by SKU or Batch ID..."
                        className="bg-transparent border-none outline-none text-sm w-full"
                    />
                </div>
                <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <Filter className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <Download className="w-4 h-4 text-slate-400" />
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Drug Name</th>
                            <th className="px-6 py-5">SKU / ID</th>
                            <th className="px-6 py-5">Batch Number</th>
                            <th className="px-6 py-5">Expiry Date</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {drugs.map((drug) => (
                            <tr key={drug.id} className="hover:bg-white/[0.03] transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {drug.name}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-slate-400 font-mono tracking-tight">{drug.sku}</td>
                                <td className="px-6 py-5 text-slate-400">{drug.batch}</td>
                                <td className="px-6 py-5 text-slate-400 italic">{drug.expiry}</td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${drug.status === "Shipped" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                        }`}>
                                        {drug.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => setSelectedQR({ id: drug.batch, name: drug.name })}
                                        className="p-2 text-slate-500 hover:text-blue-400 transition-colors"
                                    >
                                        <QrCode className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <QRModal
                isOpen={!!selectedQR}
                onClose={() => setSelectedQR(null)}
                batchId={selectedQR?.id || ""}
                drugName={selectedQR?.name || ""}
            />
        </div>
    );
}
