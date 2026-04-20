"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, GripVertical, Image as ImageIcon, Video, 
  FileText, HelpCircle, Save, Globe, Trash2
} from "lucide-react";
import Sidebar from "../../../../components/navigation/Sidebar";
import { GlassCard, GoldButton, OutlineButton, AnimatedInput } from "../../../../components/ui/SharedElements";

export default function CourseCreator() {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Introduction to Tajweed",
      lessons: [
        { id: 101, title: "What is Tajweed?", type: "video" },
        { id: 102, title: "The Virtues of Reciting Correctly", type: "text" },
      ]
    }
  ]);

  // Dynamic Handlers for Curriculum Builder
  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: "New Section", lessons: [] }]);
  };

  const addLesson = (sectionId) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lessons: [...sec.lessons, { id: Date.now(), title: "New Lesson", type: "video" }]
        };
      }
      return sec;
    }));
  };

  const deleteLesson = (sectionId, lessonId) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return { ...sec, lessons: sec.lessons.filter(l => l.id !== lessonId) };
      }
      return sec;
    }));
  };

  const getLessonIcon = (type) => {
    switch(type) {
      case "video": return <Video size={16} className="text-blue-400" />;
      case "text": return <FileText size={16} className="text-accent-emerald" />;
      case "quiz": return <HelpCircle size={16} className="text-accent-gold" />;
      default: return <Video size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-[280px] pb-24 md:pb-8 p-6 md:p-10 transition-all duration-300">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sticky top-0 bg-bg-base/80 backdrop-blur-md z-40 py-4 border-b border-border-subtle">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Create New Course</h1>
            <p className="text-text-secondary text-sm">Design and structure your educational content.</p>
          </div>
          <div className="flex items-center gap-4">
            <OutlineButton className="py-2.5 px-5 text-sm gap-2">
              <Save size={16} /> Save Draft
            </OutlineButton>
            <GoldButton className="py-2.5 px-5 text-sm gap-2">
              <Globe size={16} className="fill-bg-base" /> Publish Course
            </GoldButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Basic Information */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-text-primary mb-6">Basic Information</h2>
              
              <div className="space-y-5">
                <AnimatedInput label="Course Title (English)" />
                
                {/* RTL Input for Arabic */}
                <div className="relative w-full">
                  <input
                    type="text"
                    dir="rtl"
                    placeholder=" "
                    className="peer w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all font-quran text-lg"
                  />
                  <label className="absolute left-4 top-3 text-text-muted pointer-events-none transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-accent-gold [-webkit-autofill]:-translate-y-6 [-webkit-autofill]:scale-90 bg-bg-surface px-1">
                    Course Title (Arabic)
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold appearance-none text-sm">
                    <option value="" disabled selected>Category</option>
                    <option value="tajweed">Tajweed</option>
                    <option value="tafseer">Tafseer</option>
                    <option value="hifz">Hifz</option>
                    <option value="arabic">Arabic Language</option>
                  </select>

                  <select className="w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold appearance-none text-sm">
                    <option value="" disabled selected>Difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <AnimatedInput label="Instructor Name" />

                <div className="relative w-full">
                  <textarea
                    placeholder=" "
                    rows="4"
                    className="peer w-full bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all resize-none"
                  />
                  <label className="absolute left-4 top-3 text-text-muted pointer-events-none transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-accent-gold [-webkit-autofill]:-translate-y-6 [-webkit-autofill]:scale-90 bg-bg-surface px-1">
                    Course Description
                  </label>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4">Course Thumbnail</h2>
              <div className="border-2 border-dashed border-border-subtle hover:border-accent-gold/50 rounded-xl bg-bg-surface/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                <div className="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon size={28} className="text-text-muted group-hover:text-accent-gold transition-colors" />
                </div>
                <p className="text-text-primary font-medium mb-1">Drag & drop image here</p>
                <p className="text-xs text-text-muted">Supports JPG, PNG, WEBP (Max 2MB)</p>
              </div>
            </GlassCard>
          </div>

          {/* RIGHT COLUMN: Curriculum Builder */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Curriculum Builder</h2>
                  <p className="text-text-secondary text-sm">Organize your course into sections and lessons.</p>
                </div>
                <button 
                  onClick={addSection}
                  className="flex items-center gap-2 text-sm text-accent-gold font-medium bg-accent-gold/10 hover:bg-accent-gold hover:text-bg-base px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={16} /> Add Section
                </button>
              </div>

              <div className="space-y-6 flex-1">
                <AnimatePresence>
                  {sections.map((section, sIdx) => (
                    <motion.div 
                      key={section.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border border-border-subtle rounded-xl overflow-hidden bg-bg-surface/30"
                    >
                      {/* Section Header */}
                      <div className="bg-bg-surface px-4 py-3 flex items-center gap-3 border-b border-border-subtle">
                        <GripVertical size={18} className="text-text-muted cursor-grab hover:text-accent-gold" />
                        <span className="text-sm font-bold text-text-muted uppercase tracking-wider">Section {sIdx + 1}:</span>
                        <input 
                          type="text" 
                          value={section.title}
                          onChange={(e) => {
                            const newSections = [...sections];
                            newSections[sIdx].title = e.target.value;
                            setSections(newSections);
                          }}
                          className="bg-transparent border-none outline-none text-text-primary font-bold flex-1 focus:ring-0"
                        />
                      </div>

                      {/* Lessons List */}
                      <div className="p-4 space-y-3">
                        <AnimatePresence>
                          {section.lessons.map((lesson, lIdx) => (
                            <motion.div 
                              key={lesson.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              className="flex items-center gap-3 bg-bg-base/80 p-3 rounded-lg border border-border-subtle/50 group"
                            >
                              <GripVertical size={16} className="text-text-muted/50 cursor-grab hover:text-accent-gold" />
                              <span className="text-xs text-text-muted font-medium w-6">{lIdx + 1}.</span>
                              <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center shrink-0">
                                {getLessonIcon(lesson.type)}
                              </div>
                              <input 
                                type="text"
                                value={lesson.title}
                                onChange={(e) => {
                                  const newSections = [...sections];
                                  newSections[sIdx].lessons[lIdx].title = e.target.value;
                                  setSections(newSections);
                                }}
                                className="bg-transparent border-none outline-none text-sm text-text-primary flex-1 focus:ring-0"
                              />
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 text-text-muted hover:text-accent-gold transition-colors">
                                  <Video size={14} />
                                </button>
                                <button 
                                  onClick={() => deleteLesson(section.id, lesson.id)}
                                  className="p-1.5 text-text-muted hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {/* Add Lesson Button */}
                        <button 
                          onClick={() => addLesson(section.id)}
                          className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold ml-8 mt-4 transition-colors group"
                        >
                          <div className="w-6 h-6 rounded-full bg-bg-surface flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                            <Plus size={14} />
                          </div>
                          Add Lesson
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}
