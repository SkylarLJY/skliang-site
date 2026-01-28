# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm type-check   # TypeScript type checking (no emit)
```

## Architecture

This is a Next.js 16 personal portfolio site with a "sandwich" theme where page sections represent sandwich layers (bread, lettuce, tomato, cheese). Uses App Router with all components in `src/`.

**Key patterns:**
- `@/*` path alias maps to `./src/*`
- `cn()` utility in `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge)
- i18n via React Context (`src/lib/i18n.tsx`) with JSON locale files in `src/locales/`
- Translations accessed via `useI18n()` hook returning `{ locale, setLocale, t }`
- Framer Motion for animations in `src/components/animations/`
- Sections use sticky positioning for stack-on-scroll effect

**Component organization:**
- `src/components/layout/` - Header, Footer, LanguageToggle
- `src/components/sections/` - Hero, About, ExperienceTimeline, ProjectsGrid, ContactForm
- `src/components/animations/` - FadeIn, SandwichLayer, StaggerChildren

## Code Style

ESLint 9 flat config with Next.js + Prettier integration. Key rules:
- `no-console: warn`
- `@typescript-eslint/no-unused-vars: error` (allows `_` prefix)
- React hooks rules enforced
