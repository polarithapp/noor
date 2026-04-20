"use client";

import { motion } from "framer-motion";
import { 
  Users, BookOpen, Radio, BookA, 
  TrendingUp, Plus, Play, Upload, MessageSquare 
} from "lucide-react";
import Sidebar from "../../../components/navigation/Sidebar";
import { GlassCard, GoldButton, OutlineButton } from "../../../components/ui/SharedElements";

export default function AdminDashboard() {
  // Mock data for the dashboard statistics
  const stats = [
    { title: "Total Students", value: "1,248", increase: "+12%", icon: Users, color: "text-accent-gold" },
    { title: "Active Courses", value: "24", increase: "+3", icon: BookOpen, color: "text-accent-emerald" },
    { title: "Books Uploaded", value: "156", increase: "+12", icon: BookA, color: "text-blue-400" },
    { title: "Live Sessions", value: "8", increase: "This Week", icon: Radio, color: "text-red-400" },
  ];

  const activities = [
    { user: "Ahmed Y.", action: "enrolled in Tajweed Level 1", time: "5 min ago" },
    { user: "Sarah M.", action: "completed Hifz Surah Al-Mulk", time: "1 hour ago" },
    { user: "System", action: "processed audio for 'Seerah of Prophet'", time: "2 hours ago" },
    { user: "Guest", action: "left a new comment in Live Class", time: "3 hours ago" },
  ];

  // Stagger animation for the stats cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Sidebar Navigation */}
      <Sidebar role="admin" />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] pb-24 md:pb-8 p-6 md:p-10 lg:p-12 transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary">
              Welcome back, Admin. Here is what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-3 rounded-xl bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold transition-colors">
              <MessageSquare size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-gold to-accent-emerald flex items-center justify-center text-bg-base font-bold shadow-gold">
              A
            </div>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="flex flex-wrap gap-4 mb-10">
          <GoldButton className="py-2.5 px-5 text-sm gap-2">
            <Play size={16} className="fill-bg-base" /> Start Live Class NOW
          </GoldButton>
          <OutlineButton className="py-2.5 px-5 text-sm gap-2">
            <Plus size={16} /> Add New Course
          </OutlineButton>
          <OutlineButton className="py-2.5 px-5 text-sm gap-2">
            <Upload size={16} /> Upload Book (ePub)
          </OutlineButton>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg bg-bg-base/50 ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-accent-emerald bg-accent-emerald/10 px-2 py-1 rounded-full border border-accent-emerald/20">
                      <TrendingUp size={12} />
                      {stat.increase}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-text-primary mb-1">{stat.value}</h3>
                    <p className="text-text-secondary text-sm">{stat.title}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section: Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area (Placeholder for Recharts) */}
          <GlassCard className="lg:col-span-2 p-6 flex flex-col min-h-[350px]">
            <h3 className="text-xl font-bold text-text-primary mb-6">Student Growth Overview</h3>
            <div className="flex-1 w-full bg-bg-base/30 rounded-xl border border-border-subtle flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <p className="text-text-muted z-10 flex items-center gap-2">
                <TrendingUp size={16} /> Chart Integration Ready
              </p>
            </div>
          </GlassCard>

          {/* Recent Activity Feed */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold text-text-primary mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {/* Timeline connecting line */}
                  {idx !== activities.length - 1 && (
                    <div className="absolute left-1.5 top-6 bottom-[-24px] w-px bg-border-subtle" />
                  )}
                  <div className="w-3 h-3 rounded-full bg-accent-gold mt-1.5 shrink-0 shadow-[0_0_10px_rgba(201,168,76,0.5)]" />
                  <div>
                    <p className="text-sm text-text-primary">
                      <span className="font-bold">{activity.user}</span> {activity.action}
                    </p>
                    <span className="text-xs text-text-muted">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm text-accent-gold font-medium border border-border-subtle rounded-xl hover:bg-accent-gold/10 transition-colors">
              View All Logs
            </button>
          </GlassCard>
          
        </div>
      </main>
    </div>
  );
}
