# Architettura del Progetto

## Panoramica

Template base per applicazioni Next.js con autenticazione e database.

## Stack Tecnologico

| Tecnologia | Utilizzo |
|-----------|----------|
| Next.js 16 | Framework React con App Router |
| TypeScript | Type-safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | Componenti UI |
| PostgreSQL + Drizzle ORM | Database |
| Clerk | Autenticazione |
| Zod | Validazione |

## Struttura Cartelle

```
├── app/                    # Pagine Next.js (App Router)
│   ├── (auth)/           # Route autenticazione
│   ├── blog/             # Pagine pubbliche blog
│   ├── dashboard/        # Pagine admin
│   └── layout.tsx       # Root layout
├── components/
│   ├── ui/              # Componenti shadcn/ui
│   └── *.tsx            # Componenti custom
├── db/
│   ├── schema.ts        # Schema Drizzle
│   └── migrations/      # Migration SQL
├── lib/
│   ├── db.ts            # Configurazione DB
│   └── utils.ts         # Utility (cn)
├── actions/             # Server Actions
├── public/              # Asset statici
└── scripts/             # Script utility
```

## Autenticazione (Clerk)

- Middleware protegge `/dashboard/*`
- UserButton per logout
- Server Actions usano `auth()` per verificare utente

## Database (Drizzle ORM)

### Schema
- `users` - Utenti (collegato a Clerk)
- `posts` - Articoli del blog
- `categories` - Categorie
- `comments` - Commenti

### Comandi
```bash
pnpm db:generate  # Genera migration
pnpm db:push      # Applica al DB
pnpm db:studio    # UI database
```

## Variabili d'Ambiente

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# App
NEXT_PUBLIC_APP_URL=
```

## Estensioni Possibili

### Autenticazione
- Sostituire Clerk con Auth.js/NextAuth
- Aggiungire ruoli utente

### Database
- Aggiungere Prisma come alternativa
- Migrare a MySQL/Supabase

### Funzionalità
- Commenti con risposte
- Ricerca articoli (Algolia/Meilisearch)
- Newsletter (Resend/Brevity)
- Analytics (Vercel/PostHog)

## Deploy

### Vercel (Consigliato)
1. Collega repo GitHub
2. Aggiungi variabili env
3. Deploy automatico

### Altro
- Railway, Render, VPS

## Sviluppo

```bash
# Setup
pnpm install
cp .env.example .env
# Configura .env

# Database
pnpm db:generate
pnpm db:push

# Sviluppo
pnpm dev
```
