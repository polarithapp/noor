"use client";

import { motion } from "framer-motion";
import { Bell, BookOpen, Mic, Share2, Award } from "lucide-react";
import Sidebar from "../../../components/navigation/Sidebar";
import { AppCard, PrimaryButton } from "../../../components/ui/SharedElements";

export default function AppHomeScreen() {
  return (
    <div className="min-h-screen bg-app-bg flex pb-20">
      {/* Sidebar acts as bottom nav on mobile automatically */}
      <Sidebar role="student" />

      <main className="flex-1 w-full max-w-2xl mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-app-purple-light flex items-center justify-center">
              <span className="text-app-purple font-bold">AK</span>
            </div>
            <div>
              <p className="text-xs text-text-muted">Assalamu Alaikum</p>
              <h1 className="text-lg font-bold text-text-main leading-tight">Ahmed Kesh</h1>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-text-main active:scale-95">
            <Bell size={20} />
          </button>
        </div>

        {/* Tokens / Streak Card (Like the video) */}
        <AppCard className="flex flex-col items-center justify-center py-6 relative overflow-hidden bg-white">
          <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-app-purple to-app-teal" />
          <Award size={48} className="text-app-purple mb-2" />
          <h2 className="text-xl font-bold text-text-main mb-1">You got today's TOKENS</h2>
          <div className="bg-amber-100 text-amber-600 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 mt-2">
            <span className="text-xs uppercase tracking-wider">Free</span>
            <span className="text-lg">10</span>
          </div>
          <p className="text-xs text-text-muted text-center mt-3 max-w-[250px]">
            Use your daily 10 tokens to use AI Learning feature or go PRO.
          </p>
        </AppCard>

        {/* Main Learning Modules (The two big squares from the video) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Qaida Learning Card (Purple) */}
          <motion.div whileTap={{ scale: 0.95 }} className="cursor-pointer">
            <div className="bg-gradient-to-br from-[#9333EA] to-[#7E22CE] rounded-[2rem] p-5 h-48 flex flex-col relative overflow-hidden shadow-float">
              {/* Decorative Arabic Letters Background */}
              <div className="absolute top-2 right-4 text-white/10 text-6xl font-arabic">أ ب ت</div>
              
              <div className="mt-auto relative z-10">
                <h3 className="text-white font-bold text-xl mb-1">Qaida<br/>Learning</h3>
                <p className="text-white/80 text-xs">Learn Qaida with AI</p>
              </div>
            </div>
          </motion.div>

          {/* Quran Learning Card (Teal) */}
          <motion.div whileTap={{ scale: 0.95 }} className="cursor-pointer">
            <div className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-[2rem] p-5 h-48 flex flex-col relative overflow-hidden shadow-soft">
              {/* Decorative Quran Icon Background */}
              <div className="absolute top-4 right-4 text-white/10">
                <BookOpen size={64} />
              </div>
              
              <div className="mt-auto relative z-10">
                <h3 className="text-white font-bold text-xl mb-1 font-quran text-right mb-2">القرآن الكريم</h3>
                <h3 className="text-white font-bold text-xl mb-1">Quran<br/>Learning</h3>
                <p className="text-white/80 text-xs">Learn Quran With AI</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Notifications Bar */}
        <AppCard className="flex items-center justify-between p-4 border-l-4 border-l-amber-400 bg-amber-50/50">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-amber-500" />
            <p className="text-xs text-text-main font-medium">Enable notifications to get alerts.</p>
          </div>
          <button className="text-xs font-bold text-app-purple bg-app-purple/10 px-3 py-1.5 rounded-full">
            Enable
          </button>
        </AppCard>

        {/* Verse of the Day Card */}
        <div>
          <h3 className="text-sm font-bold text-text-muted mb-3 uppercase tracking-wider px-2">Verse of the Day</h3>
          <AppCard className="p-6">
            <h4 className="font-quran text-2xl text-text-main leading-relaxed text-right mb-4" dir="rtl">
              وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا
            </h4>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              "And to Allah belong the best names, so invoke Him by them."
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-sm font-bold text-app-purple">Al-A'raf</p>
                <p className="text-xs text-text-muted">Verse: 180</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-text-muted hover:bg-app-purple hover:text-white transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </AppCard>
        </div>

      </main>
    </div>
  );
      }
