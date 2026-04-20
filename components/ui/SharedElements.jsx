"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 1. App-Style Main Button (Purple)
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

// 2. Clean App Card (White with soft shadow)
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
