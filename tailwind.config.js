import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['Caveat', 'cursive'], // Calligraphic font for headings
      },
      colors: {
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        glass: 'rgba(249, 250, 251, 0.08)', // Neutral glass background
      },
      borderColor: {
        glass: 'rgba(249, 250, 251, 0.12)', // Neutral glass border
      },
      boxShadow: {
        'glass': '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)',
        'glass-hover': '0 35px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
