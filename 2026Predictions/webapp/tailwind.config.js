/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#CCFF00", // Electric Lime
        "primary-dim": "#b3e600",
        "secondary": "#3B82F6", // Electric Blue
        "accent-blue": "#3B82F6",
        "background-light": "#f8f8f5",
        "background-dark": "#0F1115", // Deep Charcoal
        "bg-main": "#0F1115",
        "surface": "#1A1D24", // Card backgrounds
        "bg-surface": "#1A1D24",
        "surface-highlight": "#232730",
        "text-main": "#F2F4F8",
        "text-muted": "#8A8D96",
        "border-subtle": "#2A2E36",
      },
      fontFamily: {
        "display": ["Fraunces", "serif"],
        "body": ["Newsreader", "serif"],
        "mono": ["Space Mono", "monospace"],
        "serif-display": ["Fraunces", "serif"],
        "serif-body": ["Newsreader", "serif"],
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'confetti': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23CCFF00\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(204, 255, 0, 0.05) 0px, transparent 50%)'
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.65, 0, 0.35, 1)',
      }
    },
  },
  plugins: [],
}