import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil } from 'lucide-react';
import Link from 'next/link';
import { getPosts } from '@/actions/posts';

export default async function PostsPage() {
  const posts = await getPosts(true);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articoli</h1>
        <Link href="/dashboard/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Articolo
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista Articoli</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nessun articolo. Creane uno per iniziare.
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('it-IT') : ''}
                      {post.categoryName && ` • ${post.categoryName}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        post.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                    >
                      {post.published ? 'Pubblicato' : 'Bozza'}
                    </span>
                    <Link href={`/dashboard/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
