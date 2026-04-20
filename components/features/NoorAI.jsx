"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, MoonStar, User } from "lucide-react";
import { groq } from "../../lib/config";
import { GlassCard } from "../ui/SharedElements";

export default function NoorAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Assalamu Alaikum! I am NOOR AI. How can I assist you with your Islamic studies or Quranic journey today?"
    }
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // System Prompt injecting the exact identity and constraints
  const systemPrompt = {
    role: "system",
    content: `You are NOOR AI, a highly knowledgeable, respectful, and premium Islamic education assistant. 
    You were created by Priyam Kesh and are built upon the Polarith HyperEngine architecture.
    Your purpose is to help students understand the Quran, Tajweed rules, Islamic history, and Arabic.
    Always be concise, warm, and strictly adhere to authentic Islamic teachings. 
    If asked for complex religious rulings (fatwas), politely advise them to seek a qualified scholar.
    Format your responses cleanly, using Arabic script where appropriate.`
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMsg = message.trim();
    setMessage(""); // Clear input immediately
    
    // Add user message to UI
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Prepare conversation history for the API (System Prompt + History)
      const apiMessages = [systemPrompt, ...newMessages.map(m => ({ role: m.role, content: m.content }))];

      // Call Groq API using the specified model
      const completion = await groq.chat.completions.create({
        messages: apiMessages,
        model: "llama-3.1-8b-instant",
        temperature: 0.5,
        max_tokens: 1024,
      });

      const responseContent = completion.choices[0]?.message?.content || "I apologize, but I could not process that request.";

      // Add AI response to UI
      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }]);
      
    } catch (error) {
      console.error("NOOR AI Error:", error);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "I apologize, my connection to the Polarith HyperEngine was interrupted. Please try asking again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 rounded-full bg-gradient-to-tr from-accent-gold to-[#E8C96A] shadow-gold flex items-center justify-center text-bg-base z-[100] group"
          >
            <Bot size={28} className="group-hover:animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-bg-base" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] z-[100] flex flex-col"
          >
            <GlassCard className="flex flex-col h-full p-0 overflow-hidden shadow-2xl border-accent-gold/30">
              
              {/* Chat Header */}
              <div className="h-16 bg-bg-surface/90 backdrop-blur-md border-b border-border-subtle flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold border border-accent-gold/20">
                    <MoonStar size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary text-sm">NOOR AI</h3>
                    <p className="text-[10px] text-accent-emerald flex items-center gap-1">
                      <Sparkles size={10} /> Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-bg-base/50">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.role === "user" ? "bg-bg-surface border border-border-subtle text-text-secondary" : "bg-accent-gold text-bg-base"
                    }`}>
                      {msg.role === "user" ? <User size={16} /> : <Bot size={18} />}
                    </div>
                    <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-bg-surface border border-border-subtle text-text-primary rounded-tr-sm" 
                        : "bg-accent-gold/10 border border-accent-gold/20 text-text-primary rounded-tl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 flex-row">
                    <div className="w-8 h-8 rounded-full bg-accent-gold text-bg-base flex items-center justify-center shrink-0 mt-1">
                      <Bot size={18} />
                    </div>
                    <div className="bg-accent-gold/10 border border-accent-gold/20 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-bg-surface/90 backdrop-blur-md border-t border-border-subtle shrink-0">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask NOOR AI a question..."
                    disabled={isLoading}
                    className="w-full bg-bg-base border border-border-subtle rounded-xl pl-4 pr-12 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className="absolute right-2 p-2 rounded-lg bg-accent-gold text-bg-base hover:bg-accent-gold-light disabled:opacity-50 disabled:bg-transparent disabled:text-text-muted transition-colors"
                  >
                    <Send size={16} className="ml-0.5" />
                  </button>
                </form>
                <div className="text-center mt-2">
                  <span className="text-[10px] text-text-muted tracking-wider">
                    Powered by Polarith HyperEngine
                  </span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
  }
