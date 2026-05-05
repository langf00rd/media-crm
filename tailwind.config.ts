import type { Config } from "tailwindcss"

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F7',
        foreground: '#1C1C1E',
        'text-secondary': '#8E8E93',
        primary: '#007AFF',
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
        'card-bg': 'rgba(255, 255, 255, 0.85)',
      },
      borderRadius: {
        card: '12px',
        input: '10px',
        pill: '22px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 8px 24px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        slideIn: 'slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        slideOut: 'slideOut 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        popIn: 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-100%)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
