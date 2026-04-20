/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // App Theme Colors (Matching the video)
        "app-bg": "#F8FAFC", // Very light grayish blue for app background
        "app-surface": "#FFFFFF", // Pure white for cards
        "app-purple": {
          light: "#E0E7FF",
          DEFAULT: "#8B5CF6", // Main brand purple
          dark: "#6D28D9",
        },
        "app-teal": {
          light: "#CCFBF1",
          DEFAULT: "#2DD4BF", // Quran AI section color
          dark: "#0F766E",
        },
        "text-main": "#1E293B", // Dark slate for primary text
        "text-muted": "#64748B", // Gray for secondary text
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        quran: ['var(--font-amiri)', 'serif'],
        arabic: ['var(--font-scheherazade)', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'float': '0 10px 30px -5px rgba(139, 92, 246, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
