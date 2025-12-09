"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check, Mail, Phone, Terminal } from "lucide-react";

export default function CTA() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const contactInfo = [
        { type: "Phone", value: "010 - 3656 - 6466", icon: Phone },
        { type: "Email", value: "startblack7@naver.com", icon: Mail },
    ];

    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-10 pb-20">

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4 relative inline-block">
                    <span className="relative z-10">Initiate Signal</span>
                    <span className="absolute top-0 left-0 -ml-1 text-genie-cyan opacity-50 animate-pulse">Initiate Signal</span>
                    <span className="absolute top-0 left-0 ml-1 text-genie-purple opacity-50 animate-pulse delay-75">Initiate Signal</span>
                </h2>
                <p className="text-gray-400 font-mono text-sm tracking-widest">ESTABLISHING SECURE CONNECTION...</p>
            </motion.div>

            {/* Hologram Card */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-lg mx-4"
            >
                {/* Hologram Projection Light */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-genie-cyan/50 to-transparent" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-genie-cyan/50 blur-sm" />

                <div className="glass-panel p-8 md:p-12 rounded-xl relative overflow-hidden group">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-genie-cyan/5 to-transparent h-1/2 w-full animate-[scan_3s_linear_infinite] pointer-events-none" />

                    <div className="flex flex-col gap-8 relative z-10">
                        <div className="flex items-center gap-3 text-genie-cyan mb-2">
                            <Terminal className="w-5 h-5" />
                            <span className="font-mono text-xs">CONTACT_PROTOCOL_V1.0</span>
                        </div>

                        {contactInfo.map((info) => (
                            <div key={info.type} className="group/item">
                                <p className="text-xs text-gray-500 uppercase mb-1 font-bold tracking-wider">{info.type}</p>
                                <button
                                    onClick={() => handleCopy(info.value, info.type)}
                                    className="w-full flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/5 hover:border-genie-cyan/50 transition-all active:scale-95 group-hover/item:bg-white/5"
                                >
                                    <span className="font-mono text-lg md:text-xl text-white tracking-wider truncate mr-4">
                                        {info.value}
                                    </span>
                                    <div className="relative">
                                        <AnimatePresence mode="wait">
                                            {copied === info.type ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Check className="w-5 h-5 text-genie-cyan" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Copy className="w-5 h-5 text-gray-500 group-hover/item:text-white" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {copied === info.type && (
                                                <motion.span
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: -25 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-genie-cyan text-black text-[10px] font-bold rounded"
                                                >
                                                    COPIED!
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-genie-cyan" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-genie-cyan" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-genie-cyan" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-genie-cyan" />
                </div>
            </motion.div>

            <style jsx global>{`
        @keyframes scan {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
        </section>
    );
}
