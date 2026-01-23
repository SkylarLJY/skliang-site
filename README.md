# skliang-site

A personal portfolio website. 

## Features

- **Sandwich-themed sections**: Hero (bread), About (lettuce), Experience (tomato), Projects (cheese), Contact (bread)
- **Bilingual support**: English and French with locale-specific emojis
- **Glassmorphic design**: Semi-transparent cards with backdrop blur effects
- **Smooth animations**: Framer Motion powered with reduced motion support
- **Stack-on-scroll effect**: Sections stack as you scroll using sticky positioning

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Linting**: ESLint 9 + Prettier

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

# Format code
pnpm format
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/
│   ├── layout/       # Header, Footer
│   └── sections/     # Hero, About, Experience, Projects, Contact
├── locales/          # en.json, fr.json translations
└── lib/              # Utilities (cn helper)
```
