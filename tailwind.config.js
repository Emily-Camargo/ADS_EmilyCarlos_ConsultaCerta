/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: ['class', '[data-mode="dark"]'],
  corePlugins: {
    backgroundOpacity: false,
  },
  content: [
    './index.html',
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/tw-elements/js/**/*.js',
    './node_modules/tw-elements-react/dist/js/**/*.js',
    './node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "jump-in": {
          "0%": {
            transform: "scale(0%)",
          },
          "80%": {
            transform: "scale(1.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "jump-in": "jump-in 0.4s",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        'medical-primary': '#2563EB',
        'medical-secondary': '#10B981', // Verde saúde/sucesso
        'system': '#475569', // Cinza neutro profissional
        'medical-primary-50': '#EFF6FF',
        'medical-primary-100': '#DBEAFE',
        'medical-primary-200': '#BFDBFE',
        'medical-primary-300': '#93C5FD',
        'medical-primary-400': '#60A5FA',
        'medical-primary-500': '#3B82F6',
        'medical-primary-600': '#2563EB',
        'medical-primary-700': '#1D4ED8',
        'medical-primary-800': '#1E40AF',
        'medical-primary-900': '#1E3A8A',
        // Verde Médico - Para indicadores de saúde, sucesso
        'medical-secondary-50': '#F0FDF4',
        'medical-secondary-100': '#DCFCE7',
        'medical-secondary-200': '#BBF7D0',
        'medical-secondary-300': '#86EFAC',
        'medical-secondary-400': '#4ADE80',
        'medical-secondary-500': '#22C55E',
        'medical-secondary-600': '#16A34A',
        'medical-secondary-700': '#15803D',
        'medical-secondary-800': '#166534',
        'medical-secondary-900': '#14532D',
        // Cores de apoio médico
        'medical-accent': '#0891B2', // Azul claro médico
        'medical-warning': '#F59E0B', // Amarelo para avisos
        'medical-error': '#EF4444', // Vermelho para emergências/erros
        'medical-info': '#3B82F6', // Azul para informações
        'medical-success': '#10B981', // Verde para sucessos
        // Tons neutros médicos
        'medical-gray-50': '#F8FAFC',
        'medical-gray-100': '#F1F5F9',
        'medical-gray-200': '#E2E8F0',
        'medical-gray-300': '#CBD5E1',
        'medical-gray-400': '#94A3B8',
        'medical-gray-500': '#64748B',
        'medical-gray-600': '#475569',
        'medical-gray-700': '#334155',
        'medical-gray-800': '#1E293B',
        'medical-gray-900': '#0F172A',
      },
      backgroundColor: {
        // Cor primária médica
        'medical-primary': '#2563EB',
        'medical-secondary': '#10B981',
        'system': '#475569',
        // Backgrounds da paleta médica
        'medical-primary-50': '#EFF6FF',
        'medical-primary-100': '#DBEAFE',
        'medical-primary-200': '#BFDBFE',
        'medical-primary-300': '#93C5FD',
        'medical-primary-400': '#60A5FA',
        'medical-primary-500': '#3B82F6',
        'medical-primary-600': '#2563EB',
        'medical-primary-700': '#1D4ED8',
        'medical-primary-800': '#1E40AF',
        'medical-primary-900': '#1E3A8A',
        // Verde médico backgrounds
        'medical-secondary-50': '#F0FDF4',
        'medical-secondary-100': '#DCFCE7',
        'medical-secondary-200': '#BBF7D0',
        'medical-secondary-300': '#86EFAC',
        'medical-secondary-400': '#4ADE80',
        'medical-secondary-500': '#22C55E',
        'medical-secondary-600': '#16A34A',
        'medical-secondary-700': '#15803D',
        'medical-secondary-800': '#166534',
        'medical-secondary-900': '#14532D',
        // Backgrounds de apoio
        'medical-accent': '#0891B2',
        'medical-warning': '#FEF3C7',
        'medical-error': '#FEE2E2',
        'medical-info': '#EFF6FF',
        'medical-success': '#F0FDF4',
        // Backgrounds neutros
        'medical-bg-light': '#F8FAFC',
        'medical-bg-soft': '#F1F5F9',
        'medical-bg-card': '#FFFFFF',
        'medical-bg-muted': '#E2E8F0',
      },
      boxShadow: {
        full: '0rem 0.15rem 1.25rem rgba(37, 99, 235, 0.16)', // Sombra com tom azul médico
        modal: '100vh 100vh 100vh 300vh rgba(15, 23, 42, 0.6)', // Modal com tom médico
        medical: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)',
      },
      screens: {
        'max-xs': { max: '320px' },
        'max-sm': { max: '640px', min: '320px' },
        'max-md': { max: '768px', min: '640px' },
        'max-lg': { max: '1024px', min: '768px' },
        'max-xl': { max: '1280px', min: '1024px' },
      },
      height: {
        '14': '3.5rem',
        '15': '3.75rem',
        '28': '7rem',
      },
      width: {
        '28': '7rem',
      },
      minWidth: {
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '18': '4.5rem',
        '20': '5rem',
        '22': '6.5rem',
        '24': '7rem',
        '28': '8rem',
      },
      zIndex: {
        '999': 999,
        '-99': -99
      },
    },
  },
  plugins: [],

})