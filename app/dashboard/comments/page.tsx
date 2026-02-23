import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CommentsPage() {
  const comments = [
    { id: 1, author: 'Mario Rossi', post: 'Benvenuto nel Blog', content: 'Ottimo articolo!', date: '2024-01-15' },
    { id: 2, author: 'Lucia Bianchi', post: 'Guida a Next.js 16', content: 'Molto utile, grazie!', date: '2024-01-20' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Commenti</h1>
      <Card>
        <CardHeader>
          <CardTitle>Ultimi Commenti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{comment.author}</h3>
                    <p className="text-sm text-muted-foreground">{comment.post}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm mb-3">{comment.content}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Approva</Button>
                  <Button variant="outline" size="sm" className="text-destructive">Elimina</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
