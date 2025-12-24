"use client";

import { motion } from "framer-motion";
import { Shield, Truck, Activity, Database, ArrowRight, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Phase 1: Intelligent Ledger is Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
        >
          Securing the Global <br />
          <span className="text-blue-500">Pharmaceutical Ledger</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          PharmaXLedger ensures the integrity, transparency, and traceability of life-saving medications. Built for the modern supply chain, powered by Artificial Ledger Technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
            Launch Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all backdrop-blur-md">
            View Protocol
          </button>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Immutable Traceability",
            desc: "Record every handover event from manufacturer to patient with cryptographic certainty.",
            icon: Shield,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            title: "Real-time Orchestration",
            desc: "Dynamic shipment monitoring with automated status updates across all stakeholders.",
            icon: Truck,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            title: "Regulatory Assurance",
            desc: "Built-in compliance monitoring for FDA (DSCSA) and EMA (FMD) standards.",
            icon: Activity,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl group hover:border-blue-500/30 transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed italic">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trust Quote / Stats */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Drugs Tracked", val: "Humira, +10 More" },
            { label: "Supply Partners", val: "Distributors & Pharmacies" },
            { label: "Status", val: "Phase 1 - Live" },
            { label: "Security", val: "Prisma & Supabase" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-slate-500 text-sm uppercase tracking-wider mb-2 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Blobs (Background) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-emerald-600/5 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}
