"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Cpu, MonitorPlay } from "lucide-react";

export default function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const steps = [
        { icon: Gamepad2, title: "Input Processing", desc: "Handling user events & packets" },
        { icon: Cpu, title: "Game Logic Update", desc: "Physics, AI, State Management" },
        { icon: MonitorPlay, title: "Rendering", desc: "Draw calls & Visual Effects" },
    ];

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="min-h-screen py-24 flex flex-col items-center justify-center relative z-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-20 text-center"
            >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-genie-cyan to-genie-purple">
                    Core Processing
                </span>
            </motion.h2>

            <div className="relative flex flex-col items-center gap-32">
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full bg-gradient-to-b from-genie-cyan via-purple-500 to-genie-cyan shadow-[0_0_10px_#00f3ff]"
                    />
                </div>

                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={step.title} className="relative flex items-center w-full max-w-4xl">
                            {/* Node on line */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-space-black border-2 border-genie-cyan rounded-full z-10 box-content">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="w-full h-full bg-genie-cyan rounded-full animate-ping"
                                />
                            </div>

                            <div className={`w-1/2 px-12 ${isEven ? 'text-right pr-20' : 'order-last text-left pl-20'}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-400">{step.desc}</p>
                                </motion.div>
                            </div>

                            <div className={`w-1/2 flex ${isEven ? 'justify-start pl-20' : 'justify-end pr-20'}`}>
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                                >
                                    <step.icon className="w-12 h-12 text-genie-cyan" />
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
