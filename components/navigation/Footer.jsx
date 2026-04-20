import Link from "next/link";
import { MoonStar, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-bg-base pt-16 pb-8 overflow-hidden z-20">
      {/* Golden Arabesque-inspired Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
      <div 
        className="absolute top-0 left-0 w-full h-3 repeat-x" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='%23C9A84C' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <MoonStar className="text-accent-gold w-8 h-8 group-hover:animate-pulse-glow" />
              <span className="font-display text-3xl font-bold text-text-primary tracking-wide">NOOR</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Illuminating hearts through divine knowledge. A premium platform for Tajweed, Tafseer, and Hifz taught by certified scholars.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider text-sm uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="/courses" className="hover:text-accent-gold transition-colors">Explore Courses</Link></li>
              <li><Link href="/live" className="hover:text-accent-gold transition-colors">Live Classes</Link></li>
              <li><Link href="/library" className="hover:text-accent-gold transition-colors">Digital Library</Link></li>
              <li><Link href="/about" className="hover:text-accent-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider text-sm uppercase">Support</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="/faq" className="hover:text-accent-gold transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-accent-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-accent-gold transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-accent-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-text-primary font-bold mb-6 tracking-wider text-sm uppercase">Connect With Us</h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-text-secondary hover:text-accent-gold hover:border-accent-gold transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Arabic Verse & Copyright */}
        <div className="border-t border-border-subtle pt-10 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <h3 
              className="font-quran text-3xl md:text-4xl text-accent-gold/80 text-center leading-relaxed" 
              dir="rtl"
            >
              وَعَلَّمَكَ مَا لَمْ تَكُن تَعْلَمُ
            </h3>
            <p className="text-text-muted text-xs italic tracking-wide">
              "And He taught you what you did not know." (Quran 4:113)
            </p>
          </div>
          
          <div className="text-text-muted text-xs mt-6 tracking-wider">
            &copy; {new Date().getFullYear()} NOOR Education. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
