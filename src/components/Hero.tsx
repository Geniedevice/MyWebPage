"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for mouse movement (Anti-Gravity feel)
    const springConfig = { damping: 20, stiffness: 70, mass: 1.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Parallax Transforms
    const textX = useTransform(smoothX, [-1, 1], [30, -30]);
    const textY = useTransform(smoothY, [-1, 1], [30, -30]);

    const bgShape1X = useTransform(smoothX, [-1, 1], [-50, 50]);
    const bgShape1Y = useTransform(smoothY, [-1, 1], [-50, 50]);

    const bgShape2X = useTransform(smoothX, [-1, 1], [-100, 100]);
    const bgShape2Y = useTransform(smoothY, [-1, 1], [-100, 100]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-1000">
            {/* Layer 3: Deep Background Elements (Fastest/Furthest parallax illusion) */}
            <motion.div
                style={{ x: bgShape2X, y: bgShape2Y }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-genie-purple/10 rounded-full blur-[100px]"
            />
            <motion.div
                style={{ x: bgShape2X, y: bgShape2Y }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-genie-cyan/10 rounded-full blur-[120px]"
            />

            {/* Layer 2: Midground Elements (Medium speed) */}
            <motion.div
                style={{ x: bgShape1X, y: bgShape1Y }}
                className="absolute w-full h-full flex items-center justify-center pointer-events-none"
            >
                <div className="w-[800px] h-[800px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            </motion.div>

            {/* Layer 1: Foreground Text (Opposite movement, Floating) */}
            <motion.div
                style={{ x: textX, y: textY }}
                className="relative z-10 text-center mix-blend-screen"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                    Dev Genie
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="mt-6 text-xl md:text-3xl text-genie-cyan font-light tracking-[0.5em] uppercase animate-pulse-glow"
                >
                    Game Client Programmer
                </motion.h2>
            </motion.div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1 h-2 bg-genie-cyan rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
