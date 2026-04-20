import { DM_Sans, Scheherazade_New, Amiri_Quran, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/ui/CustomCursor";

// ==========================================
// 1. FONT OPTIMIZATION & INJECTION
// ==========================================
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  variable: "--font-scheherazade",
  display: "swap",
  weight: ["400", "700"],
});

const amiri = Amiri_Quran({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400"],
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic", "latin"],
  variable: "--font-urdu",
  display: "swap",
  weight: ["400", "700"],
});

// ==========================================
// 2. GLOBAL METADATA (SEO & PWA/Capacitor Support)
// ==========================================
export const metadata = {
  title: "NOOR | Premium Quran Education",
  description: "Begin Your Journey with the Holy Quran. World-class Tajweed, Tafseer & Hifz taught by certified scholars.",
  applicationName: "NOOR",
  themeColor: "#0A0C10",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0", // Crucial for mobile app feel
};

// ==========================================
// 3. ROOT HTML LAYOUT
// ==========================================
export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${dmSans.variable} ${scheherazade.variable} ${amiri.variable} ${urdu.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased relative min-h-screen">
        {/* Global Custom Cursor */}
        <CustomCursor />
        
        {/* Main Application Container */}
        <main className="relative z-10 flex flex-col min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
