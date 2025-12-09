"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";
import { ExternalLink, Github, Monitor, BookOpen } from "lucide-react";

const links = [
    {
        name: "Portfolio",
        url: "https://www.miricanvas.com/v/14y5a42",
        icon: Monitor,
        description: "Visual Works & Resume",
        gradient: "from-cyan-500/20 to-blue-500/20",
        border: "group-hover:border-cyan-400"
    },
    {
        name: "Github",
        url: "https://github.com/Geniedevice/Geniedevice",
        icon: Github,
        description: "Source Code & Projects",
        gradient: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-400"
    },
    {
        name: "Naver Blog",
        url: "https://blog.naver.com/startblack7",
        icon: BookOpen,
        description: "Development Logs",
        gradient: "from-green-500/20 to-emerald-500/20",
        border: "group-hover:border-green-400"
    }
];

function TiltCard({ item, index }: { item: typeof links[0], index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group w-full max-w-sm h-96 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border border-white/10 ${item.border} transition-colors duration-500 flex flex-col items-center justify-center cursor-pointer`}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="flex flex-col items-center gap-6"
            >
                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <item.icon className="w-12 h-12 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-400 font-light">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-widest mt-4">
                    <span>Explore</span> <ExternalLink className="w-3 h-3" />
                </div>
            </div>

            {/* Glare effect */}
            <div
                className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ transform: "translateZ(20px)" }}
            />
        </motion.a>
    );
}

export default function LinkSection() {
    return (
        <section className="min-h-screen py-20 px-8 flex flex-col items-center justify-center relative z-10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">My Base</h2>
                <p className="text-gray-400 max-w-lg mx-auto">Gateway to my codebase and creative works.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 perspective-1000 w-full max-w-6xl">
                {links.map((link, i) => (
                    <div key={link.name} className="flex justify-center">
                        {/* Floating animation wrapper */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 1.5 // Stagger floating phases
                            }}
                            className="w-full flex justify-center"
                        >
                            <TiltCard item={link} index={i} />
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}
