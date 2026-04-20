"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ==========================================
// NEW LIGHT APP COMPONENTS (Matching the Video)
// ==========================================
export function PrimaryButton({ children, className, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full bg-app-purple text-white font-semibold py-4 px-6 rounded-full active:scale-95 transition-transform shadow-float flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AppCard({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-app-surface rounded-3xl p-5 shadow-soft border border-slate-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// THE BRIDGE COMPONENTS
// (These catch old dark mode code and instantly convert them to light mode!)
// ==========================================

export function GlassCard({ children, className, ...props }) {
  // Swaps the old GlassCard for the clean white AppCard
  return <AppCard className={className} {...props}>{children}</AppCard>;
}

export function GoldButton({ children, className, ...props }) {
  // Swaps the old GoldButton for the new Purple PrimaryButton
  return <PrimaryButton className={className} {...props}>{children}</PrimaryButton>;
}

export function OutlineButton({ children, className, ...props }) {
  // A clean, modern purple outline button
  return (
    <button
      className={cn(
        "w-full bg-transparent border-2 border-app-purple text-app-purple font-semibold py-3 px-6 rounded-full active:scale-95 transition-transform flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AnimatedInput({ label, type = "text", ...props }) {
  // A clean, rounded input field matching the new app aesthetic
  return (
    <div className="relative w-full mb-4 z-0">
      <input
        type={type}
        placeholder=" "
        className="peer w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-text-main focus:outline-none focus:border-app-purple focus:ring-1 focus:ring-app-purple transition-all"
        {...props}
      />
      <label className="absolute left-4 top-4 text-text-muted text-sm pointer-events-none transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-app-purple [-webkit-autofill]:-translate-y-6 [-webkit-autofill]:scale-90 bg-slate-50 px-1 rounded-md">
        {label}
      </label>
    </div>
  );
}
