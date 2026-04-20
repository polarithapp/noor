"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Play, Star, Users, BookOpen, Award, Radio } from "lucide-react";
import Navbar from "../components/navigation/Navbar";
import { GoldButton, OutlineButton, GlassCard } from "../components/ui/SharedElements";

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax calculations
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1DB97A]/10 via-[#0A0C10] to-[#C9A84C]/10 z-0" />

        {/* Massive Background Calligraphy (Bismillah) */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[12rem] md:text-[20rem] text-accent-gold opacity-5 font-quran pointer-events-none select-none z-0 whitespace-nowrap"
        >
          بِسۡمِ ٱللَّهِ
        </motion.div>

        {/* 3D CSS Crescent Moon (Animated) */}
        <motion.div
          className="absolute top-[20%] right-[10%] md:right-[20%] w-24 h-24 md:w-40 md:h-40 rounded-full z-0"
          style={{
            boxShadow: "inset -15px 5px 0 5px rgba(201,168,76,0.9)",
            filter: "drop-shadow(0 0 40px rgba(201,168,76,0.5))"
          }}
          animate={{ 
            rotate: 360,
            y: [-15, 15, -15]
          }}
          transition={{ 
            rotate: { duration: 80, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Hero Content */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10 md:mt-0"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary leading-tight mb-6"
          >
            Begin Your Journey <br className="hidden md:block" />
            with the <span className="text-transparent bg-clip-text bg-gold-gradient relative">
              Holy Quran
              {/* Golden underline drawing effect */}
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 w-full h-[3px] bg-accent-gold origin-left"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            World-class Tajweed, Tafseer & Hifz — taught by certified scholars. Experience the light of divine knowledge.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GoldButton className="w-full sm:w-auto px-8 py-4 text-lg">
              Explore Courses
            </GoldButton>
            <OutlineButton className="w-full sm:w-auto px-8 py-4 text-lg flex items-center justify-center gap-2">
              <Play fill="currentColor" size={18} />
              Watch Free Lesson
            </OutlineButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FEATURE STRIP (Marquee) ================= */}
      <div className="w-full bg-bg-surface border-y border-border-subtle py-4 overflow-hidden relative z-20 flex">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 px-8 items-center text-accent-gold font-medium text-lg"
        >
          {/* Duplicated for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              <span className="flex items-center gap-2"><BookOpen size={20}/> 20+ Courses</span>
              <span className="text-border-subtle">|</span>
              <span className="flex items-center gap-2"><Users size={20}/> 50,000+ Students</span>
              <span className="text-border-subtle">|</span>
              <span className="flex items-center gap-2"><Award size={20}/> Certified Instructors</span>
              <span className="text-border-subtle">|</span>
              <span className="flex items-center gap-2"><Radio size={20} className="text-red-500 animate-pulse"/> Live Classes Daily</span>
              <span className="text-border-subtle">|</span>
              <span className="flex items-center gap-2 text-accent-emerald">🤖 AI-Powered Learning</span>
              <span className="text-border-subtle">|</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= COURSES SECTION ================= */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">Featured Courses</h2>
          <p className="text-text-secondary">Beginner to Advanced Islamic Studies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample Course Card */}
          {[1, 2, 3].map((item) => (
            <GlassCard key={item} className="group p-0 overflow-hidden flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-bg-elevated group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  <BookOpen size={48} className="text-accent-gold/20" />
                  {/* Replace with actual Next Image later */}
                </div>
                <div className="absolute top-4 right-4 bg-bg-base/80 backdrop-blur-md border border-border-subtle text-xs px-3 py-1 rounded-full text-accent-gold font-medium">
                  Beginner
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-sans text-xl font-bold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                  Tajweed Fundamentals
                </h3>
                <h4 className="font-quran text-lg text-text-secondary mb-4 text-right" dir="rtl">
                  أساسيات التجويد
                </h4>
                
                <div className="flex items-center gap-3 mb-6 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-accent-emerald/20 flex items-center justify-center text-accent-emerald text-xs font-bold">
                    SA
                  </div>
                  <span className="text-sm text-text-secondary">Sheikh Abdullah</span>
                </div>
                
                <button className="w-full py-3 rounded-lg border border-border-subtle text-accent-gold font-medium hover:bg-accent-gold hover:text-bg-base transition-colors duration-300">
                  Enroll Now
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
