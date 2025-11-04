/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    // Disable unused Tailwind features to reduce bundle size
    preflight: true,
  },
  // Optimize CSS output
  important: false,
};
