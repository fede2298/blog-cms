# Contribuire

## Setup Locale

```bash
pnpm install
cp .env.example .env
# Configura le variabili
pnpm dev
```

## Regole

- Usa TypeScript strict
- Preferisci Server Components
- Usa `pnpm` come package manager
- Formatta con Biome prima di committare

## Comandi Utili

```bash
pnpm dev          # Sviluppo
pnpm build        # Build produzione
pnpm lint         # Linting
pnpm db:generate  # Genera migration
pnpm db:push      # Applica migration
```
