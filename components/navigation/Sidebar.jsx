"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/config";
import { cn } from "../ui/SharedElements";
import { 
  LayoutDashboard, BookOpen, Radio, BookA, Users, 
  Image as ImageIcon, Settings, LogOut, ChevronLeft, 
  ChevronRight, Compass, Bot, User, MoonStar 
} from "lucide-react";

export default function Sidebar({ role = "student" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile bottom-tab fallback
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // ==========================================
  // ROLE-BASED NAVIGATION LINKS
  // ==========================================
  const adminLinks = [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
    { name: "Live Classes", href: "/dashboard/admin/live", icon: Radio },
    { name: "Books", href: "/dashboard/admin/books", icon: BookA },
    { name: "Students", href: "/dashboard/admin/students", icon: Users },
    { name: "Banners", href: "/dashboard/admin/banners", icon: ImageIcon },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  const studentLinks = [
    { name: "My Learning", href: "/dashboard/student", icon: LayoutDashboard },
    { name: "Explore", href: "/courses", icon: Compass },
    { name: "Live", href: "/dashboard/student/live", icon: Radio },
    { name: "Library", href: "/dashboard/student/library", icon: BookA },
    { name: "NOOR AI", href: "/dashboard/student/ai", icon: Bot },
    { name: "Profile", href: "/dashboard/student/profile", icon: User },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  // ==========================================
  // MOBILE BOTTOM TABS (Capacitor Optimized)
  // ==========================================
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 w-full h-16 bg-bg-elevated border-t border-border-subtle z-[100] flex items-center justify-around px-2 pb-safe">
        {links.slice(0, 5).map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="flex flex-col items-center justify-center w-full h-full gap-1"
            >
              <Icon 
                size={20} 
                className={isActive ? "text-accent-gold" : "text-text-muted"} 
              />
              <span className={cn("text-[10px] font-medium", isActive ? "text-accent-gold" : "text-text-muted")}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // ==========================================
  // DESKTOP SIDEBAR
  // ==========================================
  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      className="fixed top-0 left-0 h-screen bg-[#0D1117] border-r border-border-subtle z-50 flex flex-col hidden md:flex"
    >
      {/* Sidebar Header / Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-border-subtle shrink-0">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <MoonStar className="text-accent-gold w-8 h-8 shrink-0" />
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="font-display text-2xl font-bold text-text-primary tracking-wide whitespace-nowrap"
            >
              NOOR
            </motion.span>
          )}
        </Link>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 bg-bg-surface border border-border-subtle rounded-full p-1 text-text-secondary hover:text-accent-gold transition-colors z-10 shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link key={link.name} href={link.href}>
              <div
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group cursor-pointer relative",
                  isActive 
                    ? "bg-accent-gold/10 text-accent-gold" 
                    : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                )}
                title={isCollapsed ? link.name : ""}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-gold rounded-r-md"
                  />
                )}
                <Icon size={22} className="shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap">
                    {link.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-border-subtle shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-3 py-3 w-full rounded-xl text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut size={22} className="shrink-0" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
