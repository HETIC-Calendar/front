# HETIC Calendar - Front-ed

## Commands

### Installation

- `nvm use` : use right node version
- `pnpm i` : install deps

### Developpement

- `pnpm dev` : launch dev server

### Build

- `pnpm build` : build app
- `pnpm preview` : launch preview server

### Others

- `pnpm prepare` : use husky
- `pnpm lint` : linter
- `pnpm format` : format codebase

## Structure

```
├── README.md
├── config.js
├── components.json
├── dist
├── index.html
├── package.json
├── pnpm.yaml
├── public
│   └── favicon.svg
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── component (custom)
│   │       └── part.tsx
│   │   └── ui (shadcn)
│   │       └── component.tsx
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   └── vite-env.d.ts
└── tsconfig.json
```
