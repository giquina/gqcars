import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gq-black': '#0a0a0a',
        'gq-gold': '#d4af37',
        'gq-blue': '#1e40af',
        'gq-accent': '#374151',
        'gq-gray': '#6b7280',
      },
    },
  },
  plugins: [],
}
export default config
