import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        corporate: {
          gray: "rgb(var(--corporate-gray) / <alpha-value>)",
          border: "rgb(var(--corporate-border) / <alpha-value>)",
          accent: "rgb(var(--corporate-accent) / <alpha-value>)",
          dark: "rgb(var(--corporate-dark) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgb(var(--corporate-border)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--corporate-border)) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;