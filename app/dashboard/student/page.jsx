"use client";

import { motion } from "framer-motion";
import { Play, CheckCircle, Clock, BookOpen, Calendar, ChevronRight } from "lucide-react";
import Sidebar from "../../../components/navigation/Sidebar";
import { GlassCard, GoldButton, OutlineButton } from "../../../components/ui/SharedElements";

// SVG Circular Progress Ring Component
const ProgressRing = ({ radius, stroke, progress, colorClass }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          stroke="var(--border-subtle)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Track */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={colorClass}
          style={{ strokeDasharray: circumference }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-text-primary font-bold">
        <span className="text-sm">{progress}%</span>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  // Mock Data
  const enrolledCourses = [
    { title: "Tajweed Fundamentals", instructor: "Sheikh Abdullah", progress: 65, totalLessons: 24, completedLessons: 15, thumbnail: "bg-blue-900/20" },
    { title: "Tafseer Surah Al-Kahf", instructor: "Ustadh Rahman", progress: 30, totalLessons: 10, completedLessons: 3, thumbnail: "bg-emerald-900/20" },
  ];

  const upcomingClasses = [
    { title: "Live Q&A: Tajweed Rules", time: "Today, 6:00 PM", duration: "45 mins" },
    { title: "Hifz Revision Circle", time: "Tomorrow, 5:30 AM", duration: "60 mins" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Sidebar Navigation */}
      <Sidebar role="student" />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] pb-24 md:pb-8 p-6 md:p-10 lg:p-12 transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Assalamu Alaikum, Ahmed 🌙
            </h1>
            <p className="text-text-secondary">
              Ready to continue your journey? You have 2 classes coming up.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center overflow-hidden">
            {/* Placeholder for User Avatar */}
            <span className="text-accent-gold font-bold">AH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Courses & Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Daily Ayah Widget */}
            <GlassCard className="relative overflow-hidden border-accent-gold/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-accent-gold mb-4 text-sm font-bold tracking-widest uppercase">
                  <BookOpen size={16} /> Daily Ayah
                </div>
                <h3 className="font-quran text-2xl md:text-3xl text-text-primary text-right leading-loose mb-4" dir="rtl">
                  إِنَّ مَعَ الْعُسْرِ يُسْرًا
                </h3>
                <p className="text-text-secondary text-lg italic mb-2">
                  "Indeed, with hardship [will be] ease."
                </p>
                <p className="text-text-muted text-sm">— Quran 94:6</p>
              </div>
            </GlassCard>

            {/* Resume Learning Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Continue Learning</h2>
                <button className="text-sm text-accent-gold hover:text-accent-gold-light flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {enrolledCourses.map((course, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <GlassCard className="p-5 flex flex-col h-full">
                      <div className="flex gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-xl ${course.thumbnail} border border-border-subtle flex items-center justify-center shrink-0`}>
                          <Play size={24} className="text-accent-gold opacity-50" />
                        </div>
                        <div>
                          <h3 className="font-bold text-text-primary mb-1 line-clamp-1">{course.title}</h3>
                          <p className="text-xs text-text-muted">{course.instructor}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-subtle/50">
                        <div className="flex items-center gap-4">
                          <ProgressRing radius={24} stroke={4} progress={course.progress} colorClass="text-accent-emerald" />
                          <div className="flex flex-col">
                            <span className="text-xs text-text-muted">Completed</span>
                            <span className="text-sm font-bold text-text-primary">{course.completedLessons} / {course.totalLessons} Lessons</span>
                          </div>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-bg-base transition-colors flex items-center justify-center">
                          <Play size={18} className="ml-1" />
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Column (Upcoming Events) */}
          <div className="space-y-8">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <Calendar className="text-accent-gold" size={20} /> Upcoming Live
              </h2>
              <div className="space-y-4">
                {upcomingClasses.map((cls, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-bg-base/50 border border-border-subtle hover:border-accent-gold/30 transition-colors group">
                    <h4 className="font-bold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">{cls.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1"><Clock size={14} /> {cls.time}</span>
                      <span className="flex items-center gap-1"><Radio size={14} className="text-red-400" /> {cls.duration}</span>
                    </div>
                    <OutlineButton className="w-full py-2 text-xs">Join Waiting Room</OutlineButton>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-gradient-to-br from-bg-surface to-bg-base border-accent-emerald/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-emerald/10 text-accent-emerald mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Weekly Goal</h3>
              <p className="text-sm text-text-secondary mb-4">You have completed 3 out of 5 lessons this week. Keep it up!</p>
              <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden">
                <div className="h-full bg-accent-emerald w-[60%]" />
              </div>
            </GlassCard>
          </div>

        </div>
      </main>
    </div>
  );
}
