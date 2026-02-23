import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Folder, MessageSquare } from 'lucide-react';
import { db } from '@/lib/db';
import { posts, categories, comments } from '@/db/schema';
import { sql } from 'drizzle-orm';

export default async function DashboardPage() {
  const [postsResult, categoriesResult, commentsResult] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(posts),
    db.select({ count: sql<number>`count(*)` }).from(categories),
    db.select({ count: sql<number>`count(*)` }).from(comments),
  ]);

  const stats = [
    { title: 'Articoli', value: postsResult[0]?.count || 0, icon: FileText },
    { title: 'Categorie', value: categoriesResult[0]?.count || 0, icon: Folder },
    { title: 'Commenti', value: commentsResult[0]?.count || 0, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
