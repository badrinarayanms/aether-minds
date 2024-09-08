import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
       fontFamily: {
        gsans: ["googlesans", "sans-serif"],
      },
      backgroundImage: {
        'Aether': 'linear-gradient(45deg, #5EA6C9, #0B5D86)', 
      },
    },
  },
  plugins: [],
};
export default config;
