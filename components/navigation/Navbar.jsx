"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MoonStar } from "lucide-react";
import { GoldButton, OutlineButton } from "../ui/SharedElements";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll to trigger the frosted glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Live Classes", href: "/live" },
    { name: "Books", href: "/library" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? "glass-panel rounded-none border-t-0 border-x-0 border-b-border-glow py-3"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <MoonStar className="text-accent-gold w-8 h-8 group-hover:animate-pulse-glow" />
            <span className="font-display text-3xl font-bold text-text-primary tracking-wide">
              NOOR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-accent-gold transition-colors font-medium text-sm tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <OutlineButton className="px-5 py-2 text-sm">Login</OutlineButton>
            </Link>
            <Link href="/register">
              <GoldButton className="px-5 py-2 text-sm">Join Free</GoldButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-primary hover:text-accent-gold transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-[101] md:hidden"
            />
            
            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-[320px] bg-bg-surface border-l border-border-subtle z-[102] p-6 shadow-2xl flex flex-col md:hidden"
              // Adding the subtle arabesque overlay strictly for the mobile menu background
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23C9A84C' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`
              }}
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-display text-2xl text-text-primary">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-accent-gold transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 flex-grow">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl text-text-primary hover:text-accent-gold transition-colors border-b border-border-subtle pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-4 mt-8">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <OutlineButton className="w-full justify-center">Login</OutlineButton>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <GoldButton className="w-full justify-center">Join Free</GoldButton>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
