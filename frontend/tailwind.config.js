/** @type {import('tailwindcss').Config} */

/**
 * DeAI Design System - Tailwind Configuration
 * 
 * Brand Identity:
 * - Primary: Black (#0A0A0F) - Represents sophistication and AI technology
 * - Accent: Purple (#8B5CF6) - Represents innovation and creativity
 * 
 * Design Philosophy:
 * - Professional, human-designed aesthetic
 * - WCAG AA compliant contrast ratios
 * - Dark mode support with proper color inversion
 * - Accessible animations with reduced motion support
 * 
 * Browser Compatibility:
 * - backdrop-filter: Not supported in Firefox < 103 (fallback provided)
 * - CSS Grid: Supported in all modern browsers
 * - Custom properties: IE11 not supported (acceptable for modern web apps)
 */

export default {
    content: [
        "./index.html",
        "./dashboard.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    // Enable dark mode with class strategy for manual control
    darkMode: 'class',

    theme: {
        extend: {
            // ========================================
            // COLORS
            // ========================================
            colors: {
                // Brand Colors
                // Used for primary branding elements, CTAs, and key UI components
                brand: {
                    black: '#0A0A0F',      // Primary brand color - deep black
                    gray: '#6B6B7F',       // Primary accent - medium gray
                },

                // Gray Scale (formerly Purple)
                // Full grayscale palette for various UI states and emphasis levels
                gray: {
                    50: '#FAFAFA',         // Lightest - backgrounds, hover states
                    100: '#F5F5F5',        // Very light - subtle backgrounds
                    200: '#E5E5E5',        // Light - borders, disabled states
                    300: '#D4D4D4',        // Medium light - secondary elements
                    400: '#A3A3A3',        // Medium - interactive elements
                    500: '#737373',        // Base gray - primary actions
                    600: '#525252',        // Medium dark - hover states
                    700: '#404040',        // Dark - active states
                    800: '#262626',        // Darker - emphasis
                    900: '#171717',        // Darkest - high contrast
                    950: '#0A0A0A',        // Ultra dark - maximum contrast
                },

                // Neutral Scale (Light Mode)
                // Grayscale palette for text, backgrounds, and UI structure
                neutral: {
                    50: '#FAFAFA',         // Lightest background
                    100: '#F8F9FB',        // Secondary background
                    200: '#E8EBF2',        // Tertiary background
                    300: '#D1D5DB',        // Subtle borders
                    400: '#9CA3AF',        // Muted elements
                    500: '#6B6B7F',        // Secondary text
                    600: '#4A4A5C',        // Primary text (light mode)
                    700: '#374151',        // Emphasis text
                    800: '#1F2937',        // Strong emphasis
                    900: '#111827',        // Maximum contrast
                    950: '#0A0A0F',        // Brand black
                },

                // Semantic Colors (Grayscale)
                // Status and feedback colors with WCAG AA compliant contrast
                success: {
                    50: '#F5F5F5',
                    100: '#E5E5E5',
                    500: '#525252',        // Primary success - WCAG AA on white
                    600: '#404040',        // Darker success - better contrast
                    700: '#262626',
                    900: '#0A0A0A',
                },

                warning: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    500: '#737373',        // Primary warning
                    600: '#525252',        // Darker warning - better contrast
                    700: '#404040',
                    900: '#171717',
                },

                error: {
                    50: '#F5F5F5',
                    100: '#E5E5E5',
                    500: '#404040',        // Primary error
                    600: '#262626',        // Darker error - better contrast
                    700: '#171717',
                    900: '#0A0A0A',
                },

                info: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    500: '#A3A3A3',        // Primary info
                    600: '#737373',        // Darker info - better contrast
                    700: '#525252',
                    900: '#171717',
                },
            },

            // ========================================
            // SPACING SCALE
            // ========================================
            // Extends default Tailwind spacing with design-specific values
            // Base unit: 0.25rem (4px)
            spacing: {
                '18': '4.5rem',    // 72px - Large component spacing
                '88': '22rem',     // 352px - Extra large sections
                '100': '25rem',    // 400px - Container widths
                '128': '32rem',    // 512px - Large containers
            },

            // ========================================
            // TYPOGRAPHY
            // ========================================
            fontSize: {
                // Extended sizes for better hierarchy
                '2xs': ['0.625rem', { lineHeight: '0.75rem' }],      // 10px
                'xs': ['0.75rem', { lineHeight: '1rem' }],           // 12px
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],       // 14px
                'base': ['1rem', { lineHeight: '1.5rem' }],          // 16px
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],       // 18px
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],        // 20px
                '2xl': ['1.5rem', { lineHeight: '2rem' }],           // 24px
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],      // 30px
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],        // 36px
                '5xl': ['3rem', { lineHeight: '1' }],                // 48px
                '6xl': ['3.75rem', { lineHeight: '1' }],             // 60px
            },

            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
            },

            // ========================================
            // SHADOWS
            // ========================================
            // Elevation system for depth and hierarchy
            boxShadow: {
                'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

                // Inner shadows for depth
                'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                'inner-lg': 'inset 0 4px 8px 0 rgb(0 0 0 / 0.1)',
            },

            // ========================================
            // BORDER RADIUS
            // ========================================
            // Consistent rounding for modern, friendly UI
            borderRadius: {
                'none': '0',
                'sm': '0.25rem',      // 4px - Small elements
                'DEFAULT': '0.5rem',  // 8px - Default
                'md': '0.625rem',     // 10px - Medium elements
                'lg': '0.75rem',      // 12px - Cards, buttons
                'xl': '1rem',         // 16px - Large cards
                '2xl': '1.5rem',      // 24px - Hero sections
                '3xl': '2rem',        // 32px - Extra large
                'full': '9999px',     // Pills, avatars
            },

            // ========================================
            // GRADIENTS
            // ========================================
            backgroundImage: {
                // Brand gradients (grayscale)
                'gradient-brand': 'linear-gradient(135deg, #0A0A0F 0%, #404040 50%, #737373 100%)',
                'gradient-brand-reverse': 'linear-gradient(135deg, #737373 0%, #404040 50%, #0A0A0F 100%)',

                // Subtle background gradients
                'gradient-light': 'linear-gradient(to bottom right, #FFFFFF 0%, #F5F5F5 100%)',
                'gradient-light-subtle': 'linear-gradient(to bottom, #FAFAFA 0%, #F5F5F5 100%)',

                // Gray accent gradients
                'gradient-gray-subtle': 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)',
                'gradient-gray-glow': 'radial-gradient(circle at 50% 0%, rgba(115, 115, 115, 0.15) 0%, transparent 50%)',

                // Dark mode gradients
                'gradient-dark': 'linear-gradient(to bottom right, #0A0A0F 0%, #262626 100%)',
                'gradient-dark-subtle': 'linear-gradient(to bottom, #171717 0%, #262626 100%)',
            },

            // ========================================
            // ANIMATIONS
            // ========================================
            keyframes: {
                // Gradient animation for dynamic backgrounds
                'gradient': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },

                // Fade in from top
                'fadeIn': {
                    'from': { opacity: '0', transform: 'translateY(-10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },

                // Slide up from bottom
                'slideUp': {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },

                // Scale in (zoom effect)
                'scaleIn': {
                    'from': { opacity: '0', transform: 'scale(0.95)' },
                    'to': { opacity: '1', transform: 'scale(1)' },
                },

                // Gray pulse effect for CTAs
                'pulseGray': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(115, 115, 115, 0.4)' },
                    '50%': { boxShadow: '0 0 0 10px rgba(115, 115, 115, 0)' },
                },

                // Shimmer effect for loading states
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },

                // Bounce for notifications
                'bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },

            animation: {
                'gradient': 'gradient 3s ease infinite',
                'fadeIn': 'fadeIn 0.3s ease-out',
                'slideUp': 'slideUp 0.4s ease-out',
                'scaleIn': 'scaleIn 0.2s ease-out',
                'pulseGray': 'pulseGray 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce': 'bounce 1s ease-in-out infinite',
            },

            // ========================================
            // TRANSITIONS
            // ========================================
            transitionDuration: {
                '0': '0ms',
                '75': '75ms',
                '100': '100ms',
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
                '500': '500ms',
                '700': '700ms',
                '1000': '1000ms',
            },

            transitionTimingFunction: {
                'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },

            // ========================================
            // Z-INDEX SCALE
            // ========================================
            // Consistent layering system
            zIndex: {
                '0': '0',
                '10': '10',
                '20': '20',
                '30': '30',
                '40': '40',
                '50': '50',        // Dropdowns, popovers
                '60': '60',        // Sticky headers
                '70': '70',        // Modals
                '80': '80',        // Notifications
                '90': '90',        // Tooltips
                '100': '100',      // Maximum (critical overlays)
            },

            // ========================================
            // BACKDROP BLUR
            // ========================================
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                'DEFAULT': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
                '2xl': '40px',
                '3xl': '64px',
            },
        },
    },

    plugins: [],
}
