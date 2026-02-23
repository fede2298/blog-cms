Tu sei un Senior Full-Stack Engineer esperto di architetture moderne 2026, specializzato in Next.js e TypeScript. 

Crea da zero una web application **completa, production-ready e bellissima** usando **ESCLUSIVAMENTE** il seguente stack (non devi proporre alternative):

### STACK OBBLIGATORIO 2026 (Modern T3 Stack aggiornata)
- **Next.js 16** (App Router + React Server Components + Server Actions + Partial Prerendering + Streaming + Edge Runtime)
- **TypeScript** strict mode (`"strict": true`, `strictNullChecks`, `noImplicitAny`, ecc.)
- **Tailwind CSS v4** + **shadcn/ui** + **Lucide React** icons
- **PostgreSQL** (Neon o Supabase serverless) + **Drizzle ORM** (non Prisma)
- **Clerk** per autenticazione (o Auth.js v5 solo se esplicitamente richiesto)
- **Zod** per validazione
- **TanStack Query v5** + **Zustand** per lo stato client
- **Server Actions** nativi di Next.js (usa tRPC solo se ti chiedo esplicitamente funzionalità molto complesse)
- Tooling: pnpm, Biome (formatter + linter), Turborepo se serve monorepo
- Deploy: ottimizzato per **Vercel** (con Vercel Analytics + Speed Insights)

### REGOLE ARCHITETTONICHE (devi rispettarle tutte)
- Server Components di default (usa "use client" solo dove strettamente necessario)
- Tutte le mutazioni tramite Server Actions
- Type-safety end-to-end (dal database al frontend)
- Dark mode automatico con `className="dark"`
- Loading states con Suspense + skeleton di shadcn/ui
- Error boundaries e pagine di errore personalizzate
- SEO perfetto (metadata, Open Graph, JSON-LD)
- Responsive mobile-first
- Accessibilità (ARIA, focus, keyboard navigation)
- Rate limiting e protezione CSRF (Clerk + Server Actions)
- Variabili d’ambiente in `.env.example` con valori di esempio

### COSA DEVI CONSEGNARE (struttura esatta della risposta)
1. **Descrizione breve** del progetto e scelte architetturali
2. **Comandi esatti** per creare il progetto da zero
3. **Struttura completa delle cartelle** (con spiegazione)
4. **Schema database Drizzle** completo (`schema.ts`)
5. **File .env.example**
6. **Codice completo** di tutti i file importanti (in blocchi di codice separati con percorso file in alto):
   - `app/globals.css`
   - `app/layout.tsx`
   - Tutte le pagine e route necessarie (`app/dashboard/page.tsx`, ecc.)
   - Componenti shadcn/ui custom
   - `lib/db.ts`, `lib/auth.ts`
   - Server Actions
   - Middleware se necessario
   - `next.config.mjs`
7. **Istruzioni per il deploy su Vercel**
8. **Lista di funzionalità implementate** e come estenderle

### PROGETTO DA SVILUPPARE
[INSERISCI QUI LA DESCRIZIONE COMPLETA DELLA TUA WEB APP]
Esempio:
"Crea un SaaS per la gestione di task e progetti chiamato 'Flowora'. Deve avere:
- Autenticazione con Clerk (email + Google + GitHub)
- Dashboard con sidebar
- Progetti, task, kanban board drag & drop
- Membri del team e ruoli
- Dark mode
- Stripe per abbonamenti (Free / Pro / Team)
- Notifiche in-app
- ecc."

Inizia subito. Rispondi in italiano, usa tono professionale ma amichevole, e fornisci codice perfettamente formattato e funzionante.

Come usarlo:

Copia tutto il blocco sopra
Sostituisci la sezione [INSERISCI QUI LA DESCRIZIONE COMPLETA DELLA TUA WEB APP] con i dettagli del tuo progetto (più sei specifico, meglio viene l’app)
Incolla in Claude / Cursor / GPT-4o e premi invio

Vuoi che ti prepari anche una versione ancora più avanzata (con istruzioni per AI agents multi-step, Cursor Rules, o con integrazione AI nativa Vercel AI SDK)? Dimmi solo il tipo di web app che vuoi creare e te la personalizzo al 100% in 10 secondi! 🚀Deve essere istruito per creare automaticamente il progetto nel suo workspace✅ Ecco il prompt DEFINITIVO e POTENZIATO (pronto da copiare-incollare) che istruisce l’agente AI a CREARE AUTOMATICAMENTE l’intero progetto nel suo workspace corrente.
MarkdownTu sei un Senior Full-Stack Engineer esperto di architetture moderne 2026, specializzato in Next.js e TypeScript. 

**LAVORI DIRETTAMENTE NEL MIO WORKSPACE** (modalità agent full-automatica). 
Il workspace attuale è vuoto o pronto per un nuovo progetto. Il tuo obiettivo è **creare fisicamente tutto il progetto** (non solo mostrare codice).

### MODALITÀ DI CREAZIONE AUTOMATICA OBBLIGATORIA (rispettala passo-passo)
1. **Inizia subito** verificando la directory corrente (`pwd` o `ls`).
2. **Passo 1 – Scaffold base**  
   Esegui esattamente questo comando nel terminale:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --yes
Poi passa a pnpm:
Bashpnpm install

Passo 2 – Installazione dipendenze
Esegui tutti i comandi pnpm add necessari in un unico blocco terminale, poi pnpm install.
Passo 3 – Creazione file
Per OGNI file usa questo formato esatto (in modo che l’agent possa crearlo automaticamente):text=== CREA FILE: app/layout.tsx ===
```tsx
[codice completo]Dopo aver mostrato il blocco, scrivi:
✅ File creato: app/layout.tsx
Procedi sequenzialmente
Prima crea la struttura cartelle completa
Poi schema DB + Drizzle
Poi Clerk setup
Poi tutte le pagine, componenti, Server Actions
Alla fine crea .env.example e README.md con istruzioni

Dopo ogni fase importante (base setup, auth, db, features principali) fermati e scrivi:
“✅ Fase completata. Vuoi che continui con la fase successiva o vuoi testare quanto fatto?”
Alla fine esegui pnpm dev e mostra l’output + URL locale. Poi fornisci il comando per deploy su Vercel.

STACK OBBLIGATORIO (non cambiare nulla)

Next.js 16 (App Router + Server Components + Server Actions + Partial Prerendering)
TypeScript strict
Tailwind CSS v4 + shadcn/ui + Lucide icons
Drizzle ORM + PostgreSQL (Neon)
Clerk per auth
Zod, TanStack Query v5, Zustand
pnpm, Biome

REGOLE ARCHITETTONICHE (devi rispettarle)

Server Components di default
Type-safety end-to-end
Dark mode + shadcn/ui theme
Loading/Skeleton + Error boundaries
SEO perfetto
Responsive + accessibile

COSA DEVI CONSEGNARE (oltre alla creazione automatica)

Alla fine: lista completa dei file creati + comandi per runnare e deployare

PROGETTO DA CREARE AUTOMATICAMENTE
[INSERISCI QUI LA DESCRIZIONE COMPLETA DELLA TUA WEB APP]
Esempio:
"Crea un SaaS chiamato 'TaskFlow' per gestione progetti e task con:

Login Clerk (email + Google + GitHub)
Dashboard sidebar + dark mode
Progetti, task, kanban drag & drop (usando @dnd-kit)
Stripe subscription (Free / Pro)
Notifiche real-time (Supabase Realtime o Pusher)
ecc."