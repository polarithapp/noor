"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, MessageSquare, PhoneOff, Mic, 
  Video, Shield, Send, Pin, Trash2, X 
} from "lucide-react";
import { GlassCard, GoldButton } from "../ui/SharedElements";

export default function LiveRoom({ roomName = "NOOR-LiveClass-8825", isHost = false, onLeave }) {
  const [chatOpen, setChatOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "System", text: "Welcome to the live class. Please be respectful.", isSystem: true },
    { id: 2, user: "Ahmed Y.", text: "Assalamu Alaikum everyone!", isSystem: false },
  ]);
  const [pinnedMessage, setPinnedMessage] = useState(null);

  // Generate the Jitsi Meet iframe URL based on the room name
  // meet.jit.si is their free public server. For production, you can point this to your own self-hosted Jitsi server.
  const jitsiDomain = "meet.jit.si";
  const jitsiUrl = `https://${jitsiDomain}/${roomName}#config.prejoinPageEnabled=false&interfaceConfig.SHOW_JITSI_WATERMARK=false`;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: isHost ? "Teacher (Admin)" : "Student",
      text: message,
      isSystem: false,
      isHost: isHost
    };

    setMessages([...messages, newMsg]);
    setMessage("");
  };

  const handlePin = (msg) => {
    setPinnedMessage(pinnedMessage?.id === msg.id ? null : msg);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    if (pinnedMessage?.id === id) setPinnedMessage(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-80px)] bg-bg-base border border-border-subtle rounded-2xl overflow-hidden relative shadow-2xl">
      
      {/* LEFT: Video Area */}
      <div className="flex-1 relative flex flex-col bg-black">
        {/* Top Status Bar overlay */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <div className="flex items-center gap-3 bg-bg-base/80 backdrop-blur-md px-4 py-2 rounded-xl border border-border-subtle pointer-events-auto">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-text-primary text-sm">LIVE</span>
            <div className="w-px h-4 bg-border-subtle mx-1" />
            <span className="text-text-secondary text-sm font-medium">{roomName.replace("NOOR-", "")}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button 
              onClick={() => setChatOpen(!chatOpen)}
              className={`p-2.5 rounded-xl border transition-colors ${chatOpen ? 'bg-accent-gold text-bg-base border-accent-gold' : 'bg-bg-base/80 border-border-subtle text-text-primary hover:text-accent-gold backdrop-blur-md'}`}
            >
              <MessageSquare size={18} />
            </button>
            <button 
              onClick={onLeave}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <PhoneOff size={16} /> Leave
            </button>
          </div>
        </div>

        {/* Jitsi Iframe */}
        <div className="w-full h-full flex-1 bg-[#111] relative">
           <iframe
            src={jitsiUrl}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            className="w-full h-full border-0"
            title="NOOR Live Class"
          />
        </div>
      </div>

      {/* RIGHT: Chat Sidebar */}
      <AnimatePresence initial={false}>
        {chatOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="bg-bg-surface border-l border-border-subtle flex flex-col shrink-0 h-full max-h-full overflow-hidden"
          >
            <div className="p-4 border-b border-border-subtle flex items-center justify-between shrink-0 bg-bg-base/50">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                Live Chat <span className="px-2 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold text-xs">24</span>
              </h3>
              <button onClick={() => setChatOpen(false)} className="text-text-muted hover:text-text-primary lg:hidden">
                <X size={18} />
              </button>
            </div>

            {/* Pinned Message Alert */}
            {pinnedMessage && (
              <div className="mx-4 mt-4 p-3 rounded-lg bg-accent-gold/10 border border-accent-gold/30 shrink-0 relative">
                <div className="flex items-center gap-2 text-accent-gold font-bold text-xs mb-1">
                  <Pin size={12} className="fill-accent-gold" /> Pinned by Teacher
                </div>
                <p className="text-text-primary text-sm">{pinnedMessage.text}</p>
                {isHost && (
                  <button onClick={() => setPinnedMessage(null)} className="absolute top-3 right-3 text-accent-gold hover:text-white">
                     <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar flex flex-col">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col group ${msg.isSystem ? 'items-center' : 'items-start'}`}>
                  {msg.isSystem ? (
                    <span className="text-xs text-text-muted bg-bg-base px-3 py-1 rounded-full border border-border-subtle">
                      {msg.text}
                    </span>
                  ) : (
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${msg.isHost ? 'text-accent-gold flex items-center gap-1' : 'text-text-secondary'}`}>
                          {msg.isHost && <Shield size={10} />} {msg.user}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <div className={`p-3 rounded-xl text-sm ${msg.isHost ? 'bg-accent-gold/10 border border-accent-gold/20 text-accent-gold-light' : 'bg-bg-base border border-border-subtle text-text-primary'}`}>
                          {msg.text}
                        </div>
                        {/* Admin Moderation Tools */}
                        {isHost && !msg.isSystem && (
                          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => handlePin(msg)} className="p-1 text-text-muted hover:text-accent-gold" title="Pin Message">
                                <Pin size={14} />
                             </button>
                             <button onClick={() => handleDelete(msg.id)} className="p-1 text-text-muted hover:text-red-400" title="Delete">
                                <Trash2 size={14} />
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-bg-base/50 border-t border-border-subtle shrink-0">
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..." 
                  maxLength={200}
                  className="w-full bg-bg-surface border border-border-subtle rounded-full pl-4 pr-12 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={!message.trim()}
                  className="absolute right-2 p-1.5 rounded-full bg-accent-gold text-bg-base hover:bg-accent-gold-light disabled:opacity-50 disabled:bg-border-subtle disabled:text-text-muted transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
        }
                  
