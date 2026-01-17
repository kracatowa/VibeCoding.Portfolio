/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      // custom theme tokens if needed
    },
  },
  plugins: [],
};