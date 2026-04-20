"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { PrimaryButton, AppCard } from "../components/ui/SharedElements";
import Navbar from "../components/navigation/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-app-bg selection:bg-app-purple selection:text-white pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Soft Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-app-purple-light/50 to-transparent -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="bg-white text-app-purple font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow-soft mb-6 inline-block">
            #1 Islamic Learning App
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-main mb-6 leading-tight">
            A better way to <br className="hidden md:block"/> 
            <span className="text-app-purple">Learn Quran</span>
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">
            Trusted by 1M+ learners who have improved their fluency and Tajweed with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <Link href="/dashboard/student" className="w-full sm:w-auto">
              <PrimaryButton className="py-4 px-8 text-lg w-full">
                Try the App Demo <ArrowRight size={20} />
              </PrimaryButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid (Matching the App squares) */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <AppCard className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-[#9333EA] to-[#7E22CE] text-white shadow-float border-none">
               <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <span className="text-4xl font-arabic">أ</span>
               </div>
               <h3 className="text-2xl font-bold mb-2">Qaida Learning</h3>
               <p className="text-white/80">Learn Arabic letters step by step with AI guidance.</p>
            </AppCard>

            <AppCard className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white shadow-soft border-none">
               <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <BookOpen size={32} />
               </div>
               <h3 className="text-2xl font-bold mb-1 font-quran">القرآن الكريم</h3>
               <h3 className="text-xl font-bold mb-2">Quran Learning</h3>
               <p className="text-white/80">AI-led lessons to help you understand & learn Quran.</p>
            </AppCard>

         </div>
      </section>
    </div>
  );
}
