import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Blog CMS
          </Link>
          <nav className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/sign-in">
              <Button>Accedi</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/" className="text-muted-foreground hover:underline mb-8 inline-block">
          &larr; Torna al blog
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground">Technology</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">15 Gennaio 2024</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Benvenuto nel Blog CMS</h1>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Admin</p>
                <p className="text-sm text-muted-foreground">Autore</p>
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Benvenuto nel nostro nuovo Blog CMS! Questo è un template completo
              costruito con le più moderne tecnologie del 2026.
            </p>
            <h2>Caratteristiche Principali</h2>
            <ul>
              <li>Next.js 16 con App Router</li>
              <li>TypeScript strict mode</li>
              <li>Tailwind CSS v4</li>
              <li>Clerk per autenticazione</li>
              <li>Drizzle ORM + PostgreSQL</li>
              <li>Server Actions</li>
            </ul>
            <h2>Come Iniziare</h2>
            <p>
              Per iniziare a sviluppare, segui questi semplici passaggi:
              configura le variabili d'ambiente, avvia il server di sviluppo
              e inizia a creare i tuoi contenuti.
            </p>
          </div>
        </article>

        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Commenti</h2>
          <p className="text-muted-foreground mb-4">
            Accedi per lasciare un commento
          </p>
          <Link href="/sign-in">
            <Button>Accedi</Button>
          </Link>
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Blog CMS. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
