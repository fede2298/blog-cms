# Blog CMS

Un CMS moderno per blog costruito con Next.js 16, Clerk e Drizzle ORM.

## Caratteristiche

- **Autenticazione** - Login/signup con Clerk (email, Google, GitHub)
- **Gestione Articoli** - CRUD completo con anteprima e pubblicazione
- **Gestione Categorie** - Creazione e organizzazione contenuti
- **Dashboard** - Pannello di amministrazione con statistiche
- **Design Responsive** - Mobile-first con Tailwind CSS
- **Dark Mode** - Tema automatico basato sulle preferenze di sistema

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4 + shadcn/ui
- PostgreSQL (Neon) + Drizzle ORM
- Clerk (autenticazione)
- Zod (validazione)
- pnpm

## Setup Locale

```bash
# Installa dipendenze
pnpm install

# Copia .env.example in .env e configura le variabili
cp .env.example .env

# Genera migration e crea tabelle
pnpm db:generate
pnpm db:push

# Avvia server di sviluppo
pnpm dev
```

## Deploy su Vercel

1. Importa il repo su [Vercel](https://vercel.com)
2. Aggiungi le variabili d'ambiente:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
3. Deploy automatico

## Variabili d'Ambiente

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Licenza

MIT
