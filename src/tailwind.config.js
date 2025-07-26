import rtl from "tailwindcss-rtl";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // ← مطمئن شو این فایل‌ها کاور شدن
  ],
  plugins: [rtl()],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"Noto Sans Arabic"', "sans-serif"],
      },
    },
  },
};
