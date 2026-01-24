# DeAI Design System Documentation

## Overview

The DeAI design system is built entirely on **Tailwind CSS** as the single source of truth for all design tokens. This ensures consistency, maintainability, and eliminates duplication.

---

## Brand Identity

### Primary Colors

- **Brand Black**: `#0A0A0F`
  - **Rationale**: Deep, sophisticated black that represents AI technology and professionalism
  - **Usage**: Primary text, backgrounds in dark mode, high-contrast elements
  - **Accessibility**: WCAG AAA on white backgrounds

- **Brand Purple**: `#8B5CF6`
  - **Rationale**: Vibrant purple representing innovation, creativity, and forward-thinking technology
  - **Usage**: Primary CTAs, links, interactive elements, brand accents
  - **Accessibility**: WCAG AA compliant when used with white text

---

## Color System

### Purple Scale (Primary Accent)

| Token | Hex | Usage |
|-------|-----|-------|
| `purple-50` | `#FAF5FF` | Lightest backgrounds, hover states |
| `purple-100` | `#F3E8FF` | Very light backgrounds |
| `purple-200` | `#E9D5FF` | Borders, disabled states |
| `purple-300` | `#D8B4FE` | Secondary elements |
| `purple-400` | `#C084FC` | Interactive elements |
| `purple-500` | `#A855F7` | Base purple, primary actions |
| `purple-600` | `#9333EA` | Hover states |
| `purple-700` | `#7E22CE` | Active states |
| `purple-800` | `#6B21A8` | Emphasis |
| `purple-900` | `#581C87` | High contrast |
| `purple-950` | `#3B0764` | Maximum contrast |

**Rationale**: Full 11-step scale provides granular control for various UI states while maintaining visual harmony.

### Neutral Scale (Grayscale)

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#FAFAFA` | Lightest background (light mode) |
| `neutral-100` | `#F8F9FB` | Secondary background |
| `neutral-200` | `#E8EBF2` | Tertiary background |
| `neutral-300` | `#D1D5DB` | Subtle borders |
| `neutral-400` | `#9CA3AF` | Muted elements |
| `neutral-500` | `#6B6B7F` | Secondary text |
| `neutral-600` | `#4A4A5C` | Primary text (light mode) |
| `neutral-700` | `#374151` | Emphasis text |
| `neutral-800` | `#1F2937` | Strong emphasis |
| `neutral-900` | `#111827` | Maximum contrast |
| `neutral-950` | `#0A0A0F` | Brand black, darkest background |

**Rationale**: Neutral scale provides sufficient contrast ratios for WCAG AA compliance across all text sizes.

### Semantic Colors

#### Success (Green)
- **Primary**: `success-600` (`#059669`)
- **Rationale**: Universally recognized positive indicator
- **Usage**: Success messages, positive status indicators, confirmation states
- **Accessibility**: WCAG AA on white

#### Warning (Orange)
- **Primary**: `warning-600` (`#D97706`)
- **Rationale**: Attention-grabbing without being alarming
- **Usage**: Warning messages, caution states, pending actions
- **Accessibility**: WCAG AA on white

#### Error (Red)
- **Primary**: `error-600` (`#DC2626`)
- **Rationale**: Universal danger/error indicator
- **Usage**: Error messages, destructive actions, validation failures
- **Accessibility**: WCAG AA on white

#### Info (Blue)
- **Primary**: `info-600` (`#2563EB`)
- **Rationale**: Neutral informational color
- **Usage**: Informational messages, tips, neutral notifications
- **Accessibility**: WCAG AA on white

---

## Dark Mode

### Implementation

Dark mode uses Tailwind's `class` strategy, allowing manual control:

```html
<html class="dark">
  <!-- Dark mode enabled -->
</html>
```

### Color Adaptations

- **Backgrounds**: Inverted neutral scale (950 → 50)
- **Text**: Light colors for readability
- **Borders**: Darker, more subtle
- **Shadows**: Reduced opacity for subtlety
- **Purple**: Lighter shades (400-500) for better contrast

**Rationale**: Manual control allows users to choose their preference and enables system-based detection via JavaScript.

---

## Typography

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-2xs` | 10px | 12px | Tiny labels, metadata |
| `text-xs` | 12px | 16px | Small labels, captions |
| `text-sm` | 14px | 20px | Secondary text, descriptions |
| `text-base` | 16px | 24px | Body text (default) |
| `text-lg` | 18px | 28px | Emphasized body text |
| `text-xl` | 20px | 28px | Small headings |
| `text-2xl` | 24px | 32px | Section headings |
| `text-3xl` | 30px | 36px | Page headings |
| `text-4xl` | 36px | 40px | Large headings |
| `text-5xl` | 48px | 48px | Hero headings |
| `text-6xl` | 60px | 60px | Display headings |

**Rationale**: Extended scale provides flexibility for complex UIs while maintaining readable line heights.

### Font Weights

- `font-normal` (400): Body text
- `font-medium` (500): Subtle emphasis
- `font-semibold` (600): Headings, buttons
- `font-bold` (700): Strong emphasis
- `font-extrabold` (800): Maximum emphasis

---

## Spacing Scale

Based on Tailwind's default 4px base unit, extended with custom values:

- `spacing-18` (72px): Large component spacing
- `spacing-88` (352px): Extra large sections
- `spacing-100` (400px): Container widths
- `spacing-128` (512px): Large containers

**Rationale**: Extends Tailwind's default scale for larger layouts while maintaining the 4px grid system.

---

## Shadows (Elevation System)

### Standard Shadows

| Class | Usage |
|-------|-------|
| `shadow-xs` | Minimal elevation (1px) |
| `shadow-sm` | Subtle elevation (cards at rest) |
| `shadow-md` | Medium elevation (dropdowns) |
| `shadow-lg` | High elevation (modals) |
| `shadow-xl` | Very high elevation (popovers) |
| `shadow-2xl` | Maximum elevation (overlays) |

### Purple Shadows (Brand Elements)

| Class | Usage |
|-------|-------|
| `shadow-purple` | Subtle purple glow for CTAs |
| `shadow-purple-lg` | Medium purple glow for hover states |
| `shadow-purple-xl` | Strong purple glow for active states |

**Rationale**: Purple shadows reinforce brand identity on interactive elements and create visual hierarchy.

---

## Border Radius

| Class | Size | Usage |
|-------|------|-------|
| `rounded-sm` | 4px | Small elements (badges) |
| `rounded` | 8px | Default (buttons, inputs) |
| `rounded-md` | 10px | Medium elements |
| `rounded-lg` | 12px | Cards, larger buttons |
| `rounded-xl` | 16px | Large cards |
| `rounded-2xl` | 24px | Hero sections |
| `rounded-3xl` | 32px | Extra large elements |
| `rounded-full` | 9999px | Pills, avatars, circular elements |

**Rationale**: Generous rounding creates a modern, friendly aesthetic while maintaining professionalism.

---

## Animations

### Available Animations

| Class | Duration | Usage |
|-------|----------|-------|
| `animate-gradient` | 3s | Animated gradient backgrounds |
| `animate-fadeIn` | 0.3s | Fade in from top |
| `animate-slideUp` | 0.4s | Slide up from bottom |
| `animate-scaleIn` | 0.2s | Scale in (zoom) |
| `animate-pulsePurple` | 2s | Purple pulse for CTAs |
| `animate-shimmer` | 2s | Loading shimmer effect |
| `animate-bounce` | 1s | Notification bounce |

**Rationale**: Subtle animations enhance UX without being distracting. All respect `prefers-reduced-motion`.

---

## Accessibility Features

### WCAG 2.1 Compliance

✅ **Focus States**: All interactive elements have visible focus rings  
✅ **Contrast Ratios**: WCAG AA minimum (4.5:1 for text, 3:1 for UI)  
✅ **Reduced Motion**: Respects `prefers-reduced-motion` media query  
✅ **High Contrast**: Enhanced borders in high contrast mode  
✅ **Keyboard Navigation**: Full keyboard support with visible focus  
✅ **Screen Readers**: `.sr-only` utility for screen reader content  

### Color Blindness Considerations

- **Deuteranopia/Protanopia**: Purple and neutral colors remain distinguishable
- **Tritanopia**: Blue info color contrasts with purple accents
- **Never rely on color alone**: Use icons, text, and patterns for status

### Browser Compatibility

| Feature | Support | Fallback |
|---------|---------|----------|
| `backdrop-filter` | Chrome 76+, Firefox 103+, Safari 9+ | Solid backgrounds via `@supports` |
| `:focus-visible` | Chrome 86+, Firefox 85+, Safari 15.4+ | Standard `:focus` |
| `prefers-reduced-motion` | All modern browsers | N/A (progressive enhancement) |
| `prefers-contrast` | Chrome 96+, Firefox 101+, Safari 14.1+ | N/A (progressive enhancement) |

---

## Component Classes

### Buttons

```html
<!-- Primary CTA -->
<button class="btn-primary">Click me</button>

<!-- Secondary action -->
<button class="btn-secondary">Cancel</button>

<!-- Outline style -->
<button class="btn-outline">Learn more</button>

<!-- Ghost style -->
<button class="btn-ghost">Skip</button>

<!-- Icon button -->
<button class="btn-icon">
  <svg>...</svg>
</button>
```

### Cards

```html
<!-- Standard card -->
<div class="card">Content</div>

<!-- Glass morphism card -->
<div class="card-glass">Content</div>

<!-- Elevated card -->
<div class="card-elevated">Content</div>
```

### Badges

```html
<span class="badge badge-purple">New</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-info">Info</span>
```

### Inputs

```html
<!-- Standard input -->
<input type="text" class="input" placeholder="Enter text">

<!-- Error state -->
<input type="text" class="input input-error" placeholder="Invalid">
```

---

## Z-Index Scale

| Value | Usage |
|-------|-------|
| `z-0` | Base layer |
| `z-10` | Slightly elevated |
| `z-20` | Elevated elements |
| `z-30` | Higher elevation |
| `z-40` | Even higher |
| `z-50` | Dropdowns, popovers |
| `z-60` | Sticky headers |
| `z-70` | Modals |
| `z-80` | Notifications |
| `z-90` | Tooltips |
| `z-100` | Critical overlays (max) |

**Rationale**: Consistent layering prevents z-index conflicts and maintains predictable stacking context.

---

## Usage Guidelines

### DO ✅

- Use Tailwind utility classes directly in HTML
- Reference design tokens from `tailwind.config.js`
- Create component classes in `@layer components` for reusable patterns
- Test with dark mode, reduced motion, and high contrast
- Maintain WCAG AA minimum contrast ratios

### DON'T ❌

- Define CSS variables that duplicate Tailwind tokens
- Use magic numbers (use spacing scale instead)
- Create one-off custom CSS outside of Tailwind layers
- Ignore accessibility features
- Override Tailwind defaults without documentation

---

## Testing Checklist

- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Focus states visible on all interactive elements
- [ ] Reduced motion disables animations
- [ ] High contrast mode enhances borders
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content properly
- [ ] Color contrast meets WCAG AA minimum
- [ ] Backdrop blur has fallback for unsupported browsers

---

## Maintenance

### Adding New Colors

1. Add to `tailwind.config.js` under `theme.extend.colors`
2. Document rationale and usage in this file
3. Test in light and dark modes
4. Verify WCAG contrast ratios

### Adding New Components

1. Create in `@layer components` in `index.css`
2. Use existing design tokens (no magic numbers)
3. Include hover, focus, active, and disabled states
4. Test accessibility features
5. Document in this file

### Updating Design Tokens

1. Update in `tailwind.config.js` (single source of truth)
2. Update documentation
3. Test all affected components
4. Verify no regressions in dark mode or accessibility

---

**Last Updated**: 2026-01-24  
**Version**: 1.0.0  
**Maintainer**: DeAI Development Team
