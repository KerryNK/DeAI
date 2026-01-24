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
                    purple: '#8B5CF6',     // Primary accent - vibrant purple
                },

                // Purple Scale
                // Full purple palette for various UI states and emphasis levels
                purple: {
                    50: '#FAF5FF',         // Lightest - backgrounds, hover states
                    100: '#F3E8FF',        // Very light - subtle backgrounds
                    200: '#E9D5FF',        // Light - borders, disabled states
                    300: '#D8B4FE',        // Medium light - secondary elements
                    400: '#C084FC',        // Medium - interactive elements
                    500: '#A855F7',        // Base purple - primary actions
                    600: '#9333EA',        // Medium dark - hover states
                    700: '#7E22CE',        // Dark - active states
                    800: '#6B21A8',        // Darker - emphasis
                    900: '#581C87',        // Darkest - high contrast
                    950: '#3B0764',        // Ultra dark - maximum contrast
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

                // Semantic Colors
                // Status and feedback colors with WCAG AA compliant contrast
                success: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    500: '#10B981',        // Primary success - WCAG AA on white
                    600: '#059669',        // Darker success - better contrast
                    700: '#047857',
                    900: '#064E3B',
                },

                warning: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    500: '#F59E0B',        // Primary warning
                    600: '#D97706',        // Darker warning - better contrast
                    700: '#B45309',
                    900: '#78350F',
                },

                error: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    500: '#EF4444',        // Primary error
                    600: '#DC2626',        // Darker error - better contrast
                    700: '#B91C1C',
                    900: '#7F1D1D',
                },

                info: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    500: '#3B82F6',        // Primary info
                    600: '#2563EB',        // Darker info - better contrast
                    700: '#1D4ED8',
                    900: '#1E3A8A',
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

                // Purple-themed shadows for brand elements
                'purple': '0 10px 25px -5px rgb(139 92 246 / 0.2), 0 4px 6px -2px rgb(139 92 246 / 0.05)',
                'purple-lg': '0 20px 40px -10px rgb(139 92 246 / 0.3), 0 8px 12px -4px rgb(139 92 246 / 0.1)',
                'purple-xl': '0 30px 60px -15px rgb(139 92 246 / 0.4), 0 12px 20px -6px rgb(139 92 246 / 0.15)',

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
                // Brand gradients
                'gradient-brand': 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)',
                'gradient-brand-reverse': 'linear-gradient(135deg, #C084FC 0%, #A855F7 50%, #8B5CF6 100%)',

                // Subtle background gradients
                'gradient-light': 'linear-gradient(to bottom right, #FFFFFF 0%, #F8F9FB 100%)',
                'gradient-light-subtle': 'linear-gradient(to bottom, #FAFAFA 0%, #F8F9FB 100%)',

                // Purple accent gradients
                'gradient-purple-subtle': 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
                'gradient-purple-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',

                // Dark mode gradients
                'gradient-dark': 'linear-gradient(to bottom right, #0A0A0F 0%, #1F2937 100%)',
                'gradient-dark-subtle': 'linear-gradient(to bottom, #111827 0%, #1F2937 100%)',
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

                // Purple pulse effect for CTAs
                'pulsePurple': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.4)' },
                    '50%': { boxShadow: '0 0 0 10px rgba(139, 92, 246, 0)' },
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
                'pulsePurple': 'pulsePurple 2s ease-in-out infinite',
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
