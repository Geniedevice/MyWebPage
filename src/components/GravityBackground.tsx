"use client";

import { useEffect, useRef } from "react";

export default function GravityBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const stars: Star[] = [];
        const numStars = 100;
        const mouse = { x: width / 2, y: height / 2 };

        class Star {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 2;
                this.density = (Math.random() * 20) + 1;
                this.color = Math.random() > 0.8 ? "#00f3ff" : "#ffffff"; // Cyan or White
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.size * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                // Simple Physics: Mouse repulsion/attraction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                // Anti-Gravity Force (Repulsion within radius)
                const maxDistance = 150;
                let force = 0;

                if (distance < maxDistance) {
                    force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to base position
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 20;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 20;
                    }
                }
            }
        }

        function init() {
            stars.length = 0;
            for (let i = 0; i < numStars; i++) {
                stars.push(new Star());
            }
        }

        function animate() {
            if (!ctx) return; // Add check inside generic check
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < stars.length; i++) {
                stars[i].draw();
                stars[i].update();
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-space-black"
        />
    );
}
