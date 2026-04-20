"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, Maximize, ChevronLeft, 
  CheckCircle, Circle, FileText, MessageCircle, 
  BookOpen, Download, Award
} from "lucide-react";
import Link from "next/link";
import Sidebar from "../../../../../components/navigation/Sidebar";
import { GlassCard, GoldButton } from "../../../../../components/ui/SharedElements";

export default function CourseViewer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLesson, setActiveLesson] = useState(101);
  const [completedLessons, setCompletedLessons] = useState([101]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock Curriculum Data
  const course = {
    title: "Tajweed Fundamentals",
    instructor: "Sheikh Abdullah",
    sections: [
      {
        id: 1,
        title: "Introduction to Tajweed",
        lessons: [
          { id: 101, title: "What is Tajweed?", duration: "12:45", type: "video" },
          { id: 102, title: "The Virtues of Reciting Correctly", duration: "08:20", type: "video" },
          { id: 103, title: "Makharij Overview", duration: "15:30", type: "video" },
        ]
      },
      {
        id: 2,
        title: "Rules of Noon Sakinah",
        lessons: [
          { id: 201, title: "Izhaar (Clear Pronunciation)", duration: "20:15", type: "video" },
          { id: 202, title: "Idghaam (Merging)", duration: "25:00", type: "video" },
        ]
      }
    ]
  };

  const handleComplete = () => {
    if (!completedLessons.includes(activeLesson)) {
      setCompletedLessons([...completedLessons, activeLesson]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Auto-advance logic could go here
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "discussion", label: "Discussion", icon: MessageCircle },
    { id: "notes", label: "My Notes", icon: FileText },
    { id: "resources", label: "Resources", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-bg-base flex">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-[280px] pb-24 md:pb-0 transition-all duration-300 flex flex-col h-screen">
        
        {/* Top Navigation Bar */}
        <div className="h-16 border-b border-border-subtle bg-bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/student" className="text-text-muted hover:text-accent-gold transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div className="hidden sm:block w-px h-6 bg-border-subtle" />
            <h1 className="font-bold text-text-primary truncate max-w-[200px] sm:max-w-md">
              {course.title}
            </h1>
          </div>
          <GoldButton 
            onClick={handleComplete}
            className="py-1.5 px-4 text-xs sm:text-sm gap-2"
          >
            <CheckCircle size={16} /> 
            <span className="hidden sm:inline">Mark Complete</span>
          </GoldButton>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          
          {/* LEFT COLUMN: Video & Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-5xl">
            
            {/* Custom Video Player Placeholder */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-border-subtle group shadow-2xl">
              {/* Confetti Animation Overlay */}
              <AnimatePresence>
                {showConfetti && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-base/80 backdrop-blur-sm"
                  >
                    <Award size={64} className="text-accent-gold mb-4 animate-pulse-glow" />
                    <h2 className="text-2xl font-bold text-text-primary">Masha'Allah!</h2>
                    <p className="text-text-secondary">Lesson Completed</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fake Video Thumbnail/Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] to-[#111420] flex items-center justify-center">
                <BookOpen size={64} className="text-accent-gold opacity-20" />
              </div>

              {/* Custom Gold Controls (Visible on hover) */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden cursor-pointer">
                  <div className="h-full bg-accent-gold w-1/3 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-accent-gold transition-colors">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
                    </button>
                    <div className="flex items-center gap-2 group/vol">
                      <Volume2 size={20} className="hover:text-accent-gold transition-colors cursor-pointer" />
                      <div className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300">
                        <div className="w-16 h-1 bg-white/20 rounded-full mt-2.5">
                          <div className="w-1/2 h-full bg-accent-gold" />
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium">04:15 / 12:45</span>
                  </div>
                  <button className="hover:text-accent-gold transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="flex-1">
              <div className="flex overflow-x-auto no-scrollbar border-b border-border-subtle mb-6 gap-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                        isActive ? "text-accent-gold" : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeLessonTab"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="text-text-secondary leading-relaxed">
                {activeTab === "overview" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 className="text-xl font-bold text-text-primary mb-4">About this lesson</h3>
                    <p className="mb-4">
                      In this foundational lesson, we explore the linguistic and technical definitions of Tajweed. 
                      You will learn why proper pronunciation is not just a recommendation, but a crucial aspect of preserving the divine text.
                    </p>
                    <p>Instructor: <span className="text-text-primary font-medium">{course.instructor}</span></p>
                  </motion.div>
                )}
                {/* Other tab contents would go here */}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Curriculum Tree */}
          <div className="w-full lg:w-80 xl:w-96 border-l border-border-subtle bg-bg-surface/30 flex flex-col h-full shrink-0">
            <div className="p-4 border-b border-border-subtle bg-bg-surface/50">
              <h2 className="font-bold text-text-primary">Course Content</h2>
              <div className="flex items-center justify-between text-xs text-text-muted mt-2">
                <span>1/24 Lessons Completed</span>
                <span className="text-accent-emerald font-bold">4%</span>
              </div>
              <div className="w-full h-1 bg-bg-base rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-accent-emerald w-[4%]" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 no-scrollbar">
              {course.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div className="px-4 py-3 bg-bg-base/50 rounded-lg border border-border-subtle/50 mb-2">
                    <h3 className="text-sm font-bold text-text-primary">{section.title}</h3>
                    <span className="text-xs text-text-muted">{section.lessons.length} Lessons</span>
                  </div>
                  
                  <div className="space-y-1">
                    {section.lessons.map((lesson) => {
                      const isComplete = completedLessons.includes(lesson.id);
                      const isActive = activeLesson === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson.id)}
                          className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-300 group ${
                            isActive 
                              ? "bg-accent-gold/10 border border-accent-gold/30" 
                              : "hover:bg-bg-surface"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isComplete ? (
                              <CheckCircle size={16} className="text-accent-emerald" />
                            ) : isActive ? (
                              <Play size={16} className="text-accent-gold fill-accent-gold/20" />
                            ) : (
                              <Circle size={16} className="text-text-muted group-hover:text-accent-gold transition-colors" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-sm mb-1 ${isActive ? "text-accent-gold font-bold" : "text-text-primary"}`}>
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                              <Play size={10} /> {lesson.duration}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
