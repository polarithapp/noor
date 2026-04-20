"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// Utility for merging tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ==========================================
// 1. MAGNETIC BUTTON
// ==========================================
export function MagneticButton({ children, className, onClick, type = "button", ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // The multiplier (0.2) controls the "pull" strength of the magnet
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); 
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative px-6 py-3 rounded-[10px] font-sans font-medium transition-colors duration-300",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ==========================================
// 2. PRIMARY GOLD CTA BUTTON
// ==========================================
export function GoldButton({ children, className, icon: Icon, ...props }) {
  return (
    <MagneticButton
      className={cn(
        "bg-gold-gradient text-bg-base font-bold shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)] flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
      {Icon && <Icon size={18} className="text-bg-base" />}
    </MagneticButton>
  );
}

// ==========================================
// 3. OUTLINE GHOST BUTTON
// ==========================================
export function OutlineButton({ children, className, ...props }) {
  return (
    <MagneticButton
      className={cn(
        "bg-transparent text-accent-gold border border-accent-gold/50 hover:bg-accent-gold/10 hover:border-accent-gold shadow-[0_0_15px_rgba(201,168,76,0)] hover:shadow-[0_0_15px_rgba(201,168,76,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </MagneticButton>
  );
}

// ==========================================
// 4. GLASSMORPHISM CARD
// ==========================================
export function GlassCard({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { 
        y: -12, // Float upward 12px
        boxShadow: "0 0 30px rgba(201, 168, 76, 0.15)", 
        borderColor: "rgba(201, 168, 76, 0.35)" 
      } : {}}
      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      className={cn(
        "glass-panel p-6 overflow-hidden relative",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 5. ANIMATED FORM INPUT
// ==========================================
export function AnimatedInput({ label, type = "text", className, ...props }) {
  return (
    <div className={cn("relative w-full", className)}>
      <input
        type={type}
        placeholder=" " // Required for the CSS peer focus trick
        className="peer w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
        {...props}
      />
      <label className="absolute left-4 top-3 text-text-muted pointer-events-none transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-accent-gold [-webkit-autofill]:-translate-y-6 [-webkit-autofill]:scale-90 bg-bg-surface px-1">
        {label}
      </label>
    </div>
  );
}
