/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0A0C10",
          surface: "#111420",
          elevated: "#181C2E",
        },
        accent: {
          gold: "#C9A84C",
          "gold-light": "#E8C96A",
          emerald: "#1DB97A",
        },
        text: {
          primary: "#F5F0E8",
          secondary: "#9BA3B8",
          muted: "#555E72",
        },
        border: {
          subtle: "rgba(201, 168, 76, 0.12)",
          glow: "rgba(201, 168, 76, 0.35)",
        },
        glass: {
          bg: "rgba(255, 255, 255, 0.04)",
        }
      },
      fontFamily: {
        display: ['"Scheherazade New"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        quran: ['"Amiri Quran"', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
      boxShadow: {
        gold: "0 0 30px rgba(201, 168, 76, 0.15)",
        'gold-hover': "0 8px 40px rgba(201, 168, 76, 0.25)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(201, 168, 76, 0.2)' },
          '50%': { opacity: .7, boxShadow: '0 0 40px rgba(201, 168, 76, 0.4)' },
        }
      }
    },
  },
  plugins: [],
};
