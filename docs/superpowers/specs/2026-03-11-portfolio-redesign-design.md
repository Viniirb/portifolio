# Portfolio Redesign — Design Spec
**Date:** 2026-03-11
**Branch:** redesign-v2
**Author:** Vinicius Barbosa

---

## Overview

Complete visual and architectural redesign of the developer portfolio. The goal is to transform the current corporate/brutalist style into a dark, creative, and visually stunning one-page experience with cinematic animations, interactive particles, and glassmorphism aesthetics.

---

## Design Decisions

### Style
- **Aesthetic:** Dark & Creative — glassmorphism, deep gradients, aurora blobs, subtle noise texture
- **Feel:** Premium, unique, artistic — stands out from typical dev portfolios

### Color Palette
```css
--bg-primary:    #080810   /* near-black with blue tint — base background */
--bg-surface:    #0F0F1A   /* cards, modals */
--bg-elevated:   #1A1A2E   /* elevated elements, hover states */
--purple-deep:   #16082E   /* very dark purple for gradients */
--purple-mid:    #4C1D95   /* medium accent */
--purple-glow:   #7C3AED   /* glow, active borders, CTAs */
--purple-subtle: #2D1B69   /* subtle borders, separators */
--white:         #F8F8FF   /* primary text */
--white-muted:   #A0A0B8   /* secondary text */
--white-dim:     #4A4A6A   /* tertiary text, placeholders */
```

### Typography
- **Display:** `Space Grotesk` — large titles, tight tracking
- **Body:** `Inter` — body text, readability
- **Mono:** `JetBrains Mono` — tech tags, code snippets, stack items

### Visual Effects
- `glow-border` — box-shadow with soft pulsing purple on hover
- `glass-card` — backdrop-filter blur(16px) + bg-white/[0.03] + purple-subtle border
- `text-gradient` — titles with background-clip: text from white to purple
- `noise-overlay` — subtle grain texture via pseudo-element on body (adds depth)
- `aurora-blob` — decorative elements with filter: blur(80px) positioned strategically

---

## Architecture

### Navigation Model
**One-page** with section anchors and smooth scroll. Rotas `/projetos`, `/sobre`, `/contato`, `/certificacoes` are removed — all content migrates to home sections. Project details open in an animated modal (no page reload).

### File Structure
```
src/
├── app/
│   ├── layout.tsx              # ThemeProvider + page enter animation
│   ├── page.tsx                # One-page: all sections in sequence
│   └── globals.css             # Design tokens + CSS variables
├── components/
│   ├── sections/               # NEW — one section per file
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── StackSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── ParticleCanvas.tsx      # NEW — interactive canvas background
│   │   ├── ProjectModal.tsx        # NEW — animated project detail modal
│   │   ├── SectionReveal.tsx       # NEW — scroll reveal wrapper
│   │   ├── CustomCursor.tsx        # NEW — custom cursor
│   │   ├── GlowBorder.tsx          # NEW — reusable glow border wrapper
│   │   └── ThemeToggle/            # Kept
│   ├── layout/
│   │   ├── Header/                 # Refactored — scroll spy nav
│   │   └── Footer/                 # Kept, simplified
│   └── providers/
├── constants/                  # Kept — projects, certifications, stack data
├── hooks/
│   ├── useScrollSpy.ts             # NEW — highlights active nav item
│   └── useCountUp.ts               # NEW — animated number counter
└── types/                      # Kept
```

---

## Sections

### 1. Hero
- Full viewport height (100vh)
- `ParticleCanvas` as absolute background — ~80 particles, interactive with mouse (lines form when distance < 120px)
- Glitch animation on name at mount — CSS keyframes offsetting text ±2px in X with clip-path, fires 3x
- Animated tag above name: `< Full Stack Developer />` in JetBrains Mono
- Large display text: `VINICIUS` / `BARBOSA` with text-gradient
- Two glassmorphism CTA buttons: "Ver Projetos" (primary, purple glow) + "Falar Comigo" (secondary, ghost)
- Availability status badge: pulsing green dot + "Disponível para projetos"
- Scroll indicator at bottom: animated chevron/arrow
- Decorative aurora blob — top right corner, filter blur(80px), deep purple

### 2. Sobre (About)
- Asymmetric layout — text on left, status card on right
- Status card (glass): current company, city (Joinville/SC), availability, years of experience
- Bio paragraphs with scroll reveal stagger
- Centered highlight phrase with text-gradient: *"Transformo complexidade em código elegante."*
- Personal interests grid — 6 cards with Phosphor icons, glass style
- Neurodiversity note styled as a feature, not a footnote

### 3. Stack
- Section with subtle dot-grid background pattern
- Technologies grouped by category: Frontend / Backend / Database / DevOps / Tools
- Each tech as a chip/badge with SVG icon + name (JetBrains Mono)
- On hover: chip expands with purple glow + subtle scale
- Categories enter sequentially with stagger animation
- Category headers with small gradient line decorators

### 4. Experiência (Experience)
- Centered vertical timeline with animated glowing purple line
- Line animates from top to bottom using SVG pathLength (Framer Motion) as user scrolls
- Cards alternate left/right on desktop, stack on mobile
- Each card: glass style, company name, role, period, tech chips, short description
- Cards animate in as the timeline line reaches them

### 5. Projetos (Projects)
- 2-column grid on desktop, 1 on mobile
- Large glass cards with: company name, role, period, tech chips, short description, "Ver detalhes" button
- On click: modal slides up from bottom with AnimatePresence
  - Modal content: full description list, complete tech stack, role highlights
  - Modal has backdrop blur overlay, close on outside click or ESC key

### 6. Certificações (Certifications)
- Section header: animated counter from 0 to 30+ when in viewport
- Filter bar by category (animated active state)
- Masonry/grid layout of compact glass badges
- Each badge: certification name, issuer, small icon

### 7. Contato (Contact)
- Minimalist, high-impact section
- Large display text: *"Vamos construir algo."* with text-gradient
- Three large link items with Phosphor icons: GitHub, LinkedIn, Email
- Each link has glow-border hover effect and subtle scale
- Simple footer below with copyright

---

## Animations

### Global Scroll Reveal
- All sections use `whileInView` + `viewport: { once: true, margin: "-100px" }`
- Default: `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }`, duration 0.6s
- Lists/grids use `staggerChildren: 0.08`

### Specific Animations
| Animation | Implementation | Trigger |
|-----------|---------------|---------|
| Hero glitch | CSS keyframes, clip-path offset ±2px | On mount, 3 cycles |
| Page enter | Purple curtain slides down then up | Route load |
| Timeline line | SVG pathLength 0→1, Framer Motion | Scroll into view |
| Counter | Custom `useCountUp` hook, rAF | Scroll into view |
| Particles | Canvas API, requestAnimationFrame | Always running |
| Custom cursor | CSS + JS position tracking | Always active |
| Card hover | scale(1.02) + glow box-shadow | Hover |
| Modal enter | y: "100%" → y: 0, AnimatePresence | Click |

### Custom Cursor
- Small white circle (8px) follows mouse natively
- On hover over interactive elements: scales to 40px with blur and opacity reduction
- Implemented with `position: fixed`, `pointer-events: none`, Framer Motion `useSpring`

---

## Dependencies

### Add
```
@fontsource/space-grotesk
@fontsource/jetbrains-mono
```

### Update
- `tailwindcss`: v3 → v4 (config migration from `tailwind.config.ts` to CSS-native `@theme`)
- All other deps already at latest versions

### Remove
- `tailwindcss-animate` — replaced by Framer Motion animations

---

## Tailwind v4 Migration Notes
- Config moves from `tailwind.config.ts` to `globals.css` using `@theme` directive
- Custom colors defined as CSS variables under `@theme`
- `postcss.config.mjs` updated to use `@tailwindcss/postcss`
- `tailwind.config.ts` deleted

---

## Responsive Strategy
- Mobile-first throughout
- Hero: single column, smaller font sizes
- Stack: horizontal scroll chips on mobile
- Experience: single column timeline on mobile
- Projects: single column on mobile
- Custom cursor: disabled on touch devices

---

## Accessibility
- All interactive elements have `aria-label`
- Modal traps focus, restores on close
- Reduced motion: `@media (prefers-reduced-motion)` disables glitch, particles, and complex animations — falls back to simple fade
- Color contrast meets WCAG AA for text on dark backgrounds

---

## Out of Scope
- Blog/articles section
- Dark/light toggle removal (ThemeToggle kept for accessibility)
- Backend/API (pure static/SSG)
- Internationalization (PT-BR only)
