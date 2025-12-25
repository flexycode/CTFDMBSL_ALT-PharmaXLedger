"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share2, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

interface QRModalProps {
    isOpen: boolean;
    onClose: () => void;
    batchId: string;
    drugName: string;
}

export function QRModal({ isOpen, onClose, batchId, drugName }: QRModalProps) {
    const trackingUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/track/${batchId}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(trackingUrl);
        toast.success("Tracking link copied to clipboard");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600" />

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Batch Identity</h3>
                                <p className="text-xs text-blue-500 font-bold uppercase tracking-widest">{batchId}</p>
                            </div>
                            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-3xl mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                            <QRCodeSVG
                                value={trackingUrl}
                                size={200}
                                level="H"
                                includeMargin={false}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="text-center mb-6">
                                <p className="text-sm font-medium text-white mb-1">{drugName}</p>
                                <p className="text-xs text-slate-500 italic">Scan to verify provenance on the Ledger</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-xs font-bold transition-all text-slate-300"
                                >
                                    <ClipboardCheck className="w-4 h-4 text-blue-500" /> Copy Link
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-bold transition-all text-white shadow-lg">
                                    <Download className="w-4 h-4" /> Save Tag
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
