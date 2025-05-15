# HETIC Calendar : Front-end

## Scripts

### Installation

- `nvm use` : use right node version
- `pnpm i` : install deps

### Development

- `pnpm dev` : launch dev server

### Build

- `pnpm build` : build app
- `pnpm preview` : launch preview server

### Misc

- `pnpm prepare` : use husky
- `pnpm lint` : linter
- `pnpm format` : format codebase

## Structure

```
├── dist
├── node_modules
├── src
│   ├── components
│   │   ├── component (custom)
│   │       └── part.tsx
│   │   └── ui (shadcn)
│   │       └── component.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public
│   └── favicon.svg
├── index.html
├── pnpm-*.yaml
├── *.config.js
├── tsconfig.*.json
├── components.json
├── package.json
└── README.md
```
