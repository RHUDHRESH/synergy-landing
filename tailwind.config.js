/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: '#0a0a0f',
        surface: {
          dark: '#12121a',
          panel: '#1a1a2e',
          glass: 'rgba(255,255,255,0.05)'
        },
        accent: {
          primary: '#6366f1',
          secondary: '#06b6d4',
          cyan: '#22d3ee'
        },
        text: {
          primary: '#e2e8f0',
          secondary: '#94a3b8',
          muted: '#64748b'
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
