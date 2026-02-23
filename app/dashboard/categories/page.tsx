import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil } from 'lucide-react';
import Link from 'next/link';
import { getCategories } from '@/actions/categories';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categorie</h1>
        <Link href="/dashboard/categories/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuova Categoria
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista Categorie</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nessuna categoria. Creane una per iniziare.
            </p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">/{category.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/categories/${category.id}`}>
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
