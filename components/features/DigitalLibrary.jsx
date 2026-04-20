"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, ChevronLeft, ChevronRight, Play, Pause, 
  Settings, Sun, Moon, Type, Volume2, FastForward, 
  X, BookA, Sparkles, Highlighter
} from "lucide-react";
import ePub from "epubjs";
import { GlassCard, GoldButton } from "../ui/SharedElements";

export default function DigitalLibrary() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [rendition, setRendition] = useState(null);
  
  // Reader Settings
  const [theme, setTheme] = useState("dark"); // dark, light, sepia
  const [fontSize, setFontSize] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  
  // TTS State
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  const viewerRef = useRef(null);

  // Mock Books Database
  const books = [
    { id: "b1", title: "The Sealed Nectar", author: "Safiur Rahman Mubarakpuri", category: "Seerah", url: "/books/sealed-nectar.epub", cover: "bg-emerald-900/20" },
    { id: "b2", title: "Tafsir Ibn Kathir", author: "Ibn Kathir", category: "Tafseer", url: "/books/ibn-kathir.epub", cover: "bg-blue-900/20" },
    { id: "b3", title: "Riyad as-Salihin", author: "Imam Nawawi", category: "Hadith", url: "/books/riyad.epub", cover: "bg-accent-gold/20" },
  ];

  // ==========================================
  // ePub Initialization
  // ==========================================
  useEffect(() => {
    if (selectedBook && viewerRef.current) {
      // In a real app, you would pass the actual ePub URL here
      // const book = ePub(selectedBook.url); 
      
      // For the UI mockup, we render an empty book viewer space
      const book = ePub(); 
      const rend = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
        spread: "none",
        manager: "continuous",
        flow: "paginated"
      });
      
      // Register custom themes with epub.js
      rend.themes.register("dark", { body: { background: "#0A0C10", color: "#F5F0E8" } });
      rend.themes.register("light", { body: { background: "#F5F0E8", color: "#0A0C10" } });
      rend.themes.register("sepia", { body: { background: "#F4ECD8", color: "#5C4B37" } });
      
      rend.themes.select(theme);
      setRendition(rend);
      
      // rend.display(); // Un-comment when a real epub URL is provided

      return () => book.destroy();
    }
  }, [selectedBook]);

  // Update Theme & Font Size
  useEffect(() => {
    if (rendition) {
      rendition.themes.select(theme);
      rendition.themes.fontSize(`${fontSize}%`);
    }
  }, [theme, fontSize, rendition]);

  // ==========================================
  // Text-To-Speech Logic (Web Speech API)
  // ==========================================
  const toggleTTS = () => {
    if (!synth) return;

    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
      } else {
        // In production, extract current page text from epub.js:
        // const range = rendition.getRange(rendition.currentLocation().start.cfi);
        // const text = range.toString();
        
        const text = "This is a placeholder text being read by the built-in Text to Speech engine. In the live version, this will read the text directly from the current ePub page.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechRate;
        utterance.onend = () => setIsPlaying(false);
        synth.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  const changeSpeed = () => {
    const rates = [0.75, 1, 1.25, 1.5];
    const nextIdx = (rates.indexOf(speechRate) + 1) % rates.length;
    setSpeechRate(rates[nextIdx]);
    
    // Restart speech with new rate if playing
    if (isPlaying && synth) {
      synth.cancel();
      setTimeout(toggleTTS, 100);
    }
  };

  // ==========================================
  // UI RENDER
  // ==========================================
  if (!selectedBook) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Digital Library</h1>
          <p className="text-text-secondary">Access premium ePubs with built-in AI summarization and Text-to-Speech.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <GlassCard key={book.id} className="p-0 flex flex-col group cursor-pointer" onClick={() => setSelectedBook(book)}>
              <div className={`h-64 ${book.cover} flex flex-col items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <BookA size={48} className="text-accent-gold/50 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold px-3 py-1 bg-bg-base/80 backdrop-blur-md rounded-full text-text-primary absolute top-4 right-4">
                  {book.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-text-primary text-lg mb-1 group-hover:text-accent-gold transition-colors">{book.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{book.author}</p>
                <div className="mt-auto">
                  <GoldButton className="w-full py-2 text-sm gap-2">
                    <BookOpen size={16} /> Read Now
                  </GoldButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  // Reader Mode View
  const bgColors = {
    dark: "bg-bg-base",
    light: "bg-[#F5F0E8]",
    sepia: "bg-[#F4ECD8]"
  };

  const textColors = {
    dark: "text-text-primary",
    light: "text-[#0A0C10]",
    sepia: "text-[#5C4B37]"
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-500 ${bgColors[theme]}`}>
      
      {/* Top Navbar */}
      <div className={`h-16 flex items-center justify-between px-6 shrink-0 border-b ${theme === 'dark' ? 'border-border-subtle bg-bg-surface/80' : 'border-black/10 bg-white/50'} backdrop-blur-md`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (synth) synth.cancel();
              setSelectedBook(null);
            }} 
            className={`${textColors[theme]} hover:opacity-70 transition-opacity`}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="w-px h-6 bg-black/10 dark:bg-white/10" />
          <h2 className={`font-bold ${textColors[theme]} hidden sm:block`}>{selectedBook.title}</h2>
        </div>

        <div className="flex items-center gap-2 relative">
          <button className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-accent-gold/10 text-accent-gold' : 'bg-black/5 text-black'} flex items-center gap-2 text-sm font-bold mr-2 hover:opacity-80 transition-opacity`}>
            <Sparkles size={16} /> <span className="hidden sm:inline">AI Summarize</span>
          </button>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl ${textColors[theme]} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
          >
            <Settings size={20} />
          </button>

          {/* Reader Settings Dropdown */}
          <AnimatePresence>
            {showSettings && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 right-0 w-64 glass-panel p-4 z-50 bg-bg-surface border-border-subtle shadow-2xl"
              >
                <div className="mb-4">
                  <span className="text-xs text-text-muted font-bold uppercase mb-2 block">Theme</span>
                  <div className="flex gap-2">
                    <button onClick={() => setTheme("dark")} className={`flex-1 p-2 rounded-lg flex justify-center bg-bg-base border ${theme === 'dark' ? 'border-accent-gold text-accent-gold' : 'border-border-subtle text-text-muted'}`}><Moon size={16} /></button>
                    <button onClick={() => setTheme("light")} className={`flex-1 p-2 rounded-lg flex justify-center bg-[#F5F0E8] border ${theme === 'light' ? 'border-accent-gold text-accent-gold' : 'border-transparent text-gray-500'}`}><Sun size={16} /></button>
                    <button onClick={() => setTheme("sepia")} className={`flex-1 p-2 rounded-lg flex justify-center bg-[#F4ECD8] border ${theme === 'sepia' ? 'border-accent-gold text-accent-gold' : 'border-transparent text-amber-800'}`}><BookA size={16} /></button>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-text-muted font-bold uppercase mb-2 block">Font Size</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setFontSize(Math.max(50, fontSize - 10))} className="p-2 rounded-lg bg-bg-base border border-border-subtle text-text-primary hover:text-accent-gold"><Type size={14} /></button>
                    <span className="flex-1 text-center text-sm text-text-primary font-bold">{fontSize}%</span>
                    <button onClick={() => setFontSize(Math.min(200, fontSize + 10))} className="p-2 rounded-lg bg-bg-base border border-border-subtle text-text-primary hover:text-accent-gold"><Type size={18} /></button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Reader Canvas */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-12 lg:px-24 py-8">
        {/* Left Arrow */}
        <button 
          onClick={() => rendition?.prev()} 
          className={`absolute left-2 lg:left-8 p-3 rounded-full bg-black/5 dark:bg-white/5 ${textColors[theme]} hover:scale-110 transition-transform z-10`}
        >
          <ChevronLeft size={24} />
        </button>

        {/* epub.js Target Div */}
        <div ref={viewerRef} className="w-full h-full max-w-4xl shadow-inner relative flex items-center justify-center">
           {!rendition && (
              <div className="text-center text-text-muted animate-pulse">
                 Loading Book Engine...
              </div>
           )}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => rendition?.next()} 
          className={`absolute right-2 lg:right-8 p-3 rounded-full bg-black/5 dark:bg-white/5 ${textColors[theme]} hover:scale-110 transition-transform z-10`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom TTS Audio Player Bar */}
      <div className={`h-20 shrink-0 border-t ${theme === 'dark' ? 'border-border-subtle bg-bg-surface/90' : 'border-black/10 bg-white/90'} backdrop-blur-md px-6 flex items-center justify-between`}>
        <div className={`flex items-center gap-3 ${textColors[theme]} max-w-[200px] sm:max-w-xs truncate`}>
          <Volume2 size={20} className="shrink-0 text-accent-gold" />
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">Audio Playback</span>
            <span className="text-sm font-medium truncate">Chapter 1: The Origins</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button onClick={changeSpeed} className={`w-12 text-center text-xs font-bold ${textColors[theme]} hover:text-accent-gold transition-colors`}>
            {speechRate}x
          </button>
          
          <button 
            onClick={toggleTTS} 
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-gold to-[#E8C96A] flex items-center justify-center text-bg-base hover:scale-105 hover:shadow-gold transition-all"
          >
            {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
          </button>
          
          <button className={`p-2 ${textColors[theme]} hover:text-accent-gold transition-colors`}>
            <FastForward size={20} />
          </button>
        </div>
        
        {/* Empty div for flexbox balancing */}
        <div className="w-[100px] hidden sm:block"></div> 
      </div>
    </div>
  );
                                                                                         }
