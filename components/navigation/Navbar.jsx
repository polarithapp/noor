"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MoonStar } from "lucide-react";
import { PrimaryButton } from "../ui/SharedElements";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-app-purple flex items-center justify-center text-white shadow-float group-hover:scale-105 transition-transform">
            <MoonStar size={24} />
          </div>
          <span className="text-2xl font-extrabold text-app-purple tracking-tight">NOOR</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard/student" className="font-bold text-text-muted hover:text-app-purple transition-colors">App Demo</Link>
          <Link href="/login" className="text-app-purple font-bold hover:opacity-80">Log In</Link>
          <Link href="/register">
            <PrimaryButton className="py-2.5 px-6 text-sm">Join Free</PrimaryButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-main p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden">
          <Link href="/dashboard/student" className="text-lg font-bold text-text-main">View App Demo</Link>
          <hr className="border-slate-100" />
          <Link href="/login" className="text-lg font-bold text-text-main">Log In</Link>
          <Link href="/register">
            <PrimaryButton className="w-full mt-2">Create Account</PrimaryButton>
          </Link>
        </div>
      )}
    </header>
  );
}
