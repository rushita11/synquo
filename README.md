# Synqvo — Vite + React + Tailwind CSS v4

A modern, high-performance web development workspace built with Vite, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework**: React 19
- **Bundler & Dev Server**: [Vite 8](https://vite.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev)
- **Linter**: Oxlint

## Getting Started

### Development
Start the local development server:
```bash
npm run dev
```

### Production Build
Build the optimized production assets in `dist/`:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

## Tailwind CSS v4 Configuration

This project uses the modern CSS-first Tailwind CSS v4 architecture. Configuration is integrated via:
1. **Vite Plugin**: `@tailwindcss/vite` registered in [vite.config.js](vite.config.js).
2. **CSS Entrypoint**: `@import "tailwindcss";` in [src/index.css](src/index.css).
