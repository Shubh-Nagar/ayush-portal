/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // India-inspired palette, refined for a research portal
        paper: '#FBF9F4',      // warm off-white page background
        ink: '#182135',        // primary text (near-navy black)
        navy: {
          DEFAULT: '#0B2E4F',  // institutional trust colour
          50: '#EEF3F8',
          100: '#D6E2EE',
          600: '#0F3A63',
          700: '#0B2E4F',
          800: '#082439',
          900: '#061B2C',
        },
        saffron: {
          DEFAULT: '#E8791B',  // flag saffron, slightly deepened for contrast
          50: '#FDF3E8',
          100: '#FBE4CC',
          400: '#F59A3E',
          500: '#E8791B',
          600: '#C9640F',
        },
        india: {
          DEFAULT: '#0F7B3E',  // flag green
          50: '#EBF6EF',
          100: '#CFE9D9',
          600: '#0F7B3E',
          700: '#0B5E30',
        },
        chakra: '#1A3A8F',     // Ashoka Chakra blue accent
        // Evidence-grading scale (the portal's signature system)
        'ev-a': '#0F7B3E',     // strongest evidence
        'ev-b': '#1A3A8F',
        'ev-c': '#B87610',
        'ev-d': '#6B7280',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,46,79,0.04), 0 8px 24px -12px rgba(11,46,79,0.12)',
        'card-hover': '0 2px 4px rgba(11,46,79,0.06), 0 16px 40px -16px rgba(11,46,79,0.22)',
        focus: '0 0 0 3px rgba(26,58,143,0.35)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
