import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

export default function HomePage() {
  const posts = [
    {
      id: 1,
      title: 'Benvenuto nel Blog CMS',
      excerpt: 'Scopri come creare un blog moderno con Next.js 16 e le ultime tecnologie.',
      category: 'Technology',
      date: '15 Gennaio 2024',
      slug: 'benvenuto-blog-cms',
    },
    {
      id: 2,
      title: 'Guida a Next.js 16',
      excerpt: 'Tutto quello che devi sapere sulle nuove funzionalità di Next.js 16.',
      category: 'Tutorial',
      date: '20 Gennaio 2024',
      slug: 'guida-nextjs-16',
    },
    {
      id: 3,
      title: 'TypeScript Best Practices',
      excerpt: 'Migliora la qualità del tuo codice con queste best practices TypeScript.',
      category: 'Design',
      date: '22 Gennaio 2024',
      slug: 'typescript-best-practices',
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Blog CMS
          </Link>
          <nav className="flex gap-4 items-center">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/sign-in">
              <Button>Accedi</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Leggi i nostri ultimi articoli e tutorial
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{post.category}</span>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Blog CMS. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
