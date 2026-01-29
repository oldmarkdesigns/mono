# Mockman - Design System Platform

A code-based design system platform built with React, TypeScript, and Vite.

## Features

- **Color Management**: Create and manage color palettes with semantic tokens
- **Typography**: Generate type scales with customizable ratios
- **Components**: Token-driven components (Coming soon)
- **Documentation**: Guidelines and component documentation (Coming soon)
- **Export**: Publish and share your design system (Coming soon)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Zustand** - State management
- **React Router** - Routing

## Architecture

The app is organized around core domain models:
- `DesignSystem` - Top-level container
- `TokenSet` - Collections of design tokens
- `Theme` - Token values and configurations
- `ComponentDefinition` - Component metadata and code

All data is persisted to localStorage with clean abstractions for future backend integration.

## Project Structure

```
src/
├── components/
│   ├── layout/       # Layout components (AppLayout)
│   └── ui/           # shadcn/ui components
├── pages/            # Page components
├── store/            # Zustand stores
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## Development Phases

- [x] Phase 1: App Shell with navigation
- [x] Phase 2: Color palette editor
- [x] Phase 3: Typography generator
- [ ] Phase 4: Button component builder
- [ ] Phase 5: Component code ingestion
- [ ] Phase 6: Documentation & publishing
