/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,jpeg,png}", // Ensures Tailwind scans all JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
