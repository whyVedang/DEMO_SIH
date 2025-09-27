/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sage Green Theme for Consumer Portal
        sage: {
          50: '#f6f8f4',
          100: '#e8f0e2',
          200: '#d2e0c6',
          300: '#b5ca9f',
          400: '#9CAF88', // Primary sage green
          500: '#87A96B', // Secondary sage green
          600: '#6b8754',
          700: '#556b44',
          800: '#475a3a',
          900: '#3d4c33',
        },
        primary: {
          50: '#f0fff4',
          100: '#c6f6d5',
          500: '#38a169',
          600: '#2f855a',
          700: '#276749',
          800: '#22543d',
          900: '#1a365d',
        },
        secondary: {
          50: '#ebf8ff',
          100: '#bee3f8',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2c5282',
        },
        // Status colors for consumer features
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        verified: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      backgroundImage: {
        'glassmorphism': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'sage-gradient': 'linear-gradient(135deg, #9CAF88, #87A96B)',
        'sage-glass': 'linear-gradient(135deg, rgba(156, 175, 136, 0.1), rgba(135, 169, 107, 0.05))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'sage': '0 4px 20px rgba(156, 175, 136, 0.2)',
        'sage-lg': '0 8px 30px rgba(156, 175, 136, 0.3)',
      },
      animation: {
        'scan': 'scan 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
