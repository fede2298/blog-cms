'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { createPost, updatePost, deletePost } from '@/actions/posts'
import { getCategories } from '@/actions/categories'
import { useRouter } from 'next/navigation'

interface PostFormProps {
  post?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    coverImage: string | null
    published: boolean
    categoryId: string | null
  }
  categories: Awaited<ReturnType<typeof getCategories>>
}

export function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    try {
      if (post) {
        await updatePost(post.id, formData)
      } else {
        await createPost(formData)
      }
      router.push('/dashboard/posts')
      router.refresh()
    } catch (err) {
      console.error(err)
      const message = err instanceof Error ? err.message : 'Errore sconosciuto'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!post) return
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return
    
    setLoading(true)
    try {
      await deletePost(post.id)
      router.push('/dashboard/posts')
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? 'Modifica Articolo' : 'Nuovo Articolo'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titolo</Label>
            <Input 
              id="title" 
              name="title" 
              defaultValue={post?.title} 
              required 
              placeholder="Titolo articolo"
            />
          </div>
          
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input 
              id="slug" 
              name="slug" 
              defaultValue={post?.slug} 
              required 
              placeholder="slug-articolo"
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">Estratto</Label>
            <Textarea 
              id="excerpt" 
              name="excerpt" 
              defaultValue={post?.excerpt || ''} 
              placeholder="Breve descrizione"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Contenuto</Label>
            <Textarea 
              id="content" 
              name="content" 
              defaultValue={post?.content} 
              required 
              placeholder="Contenuto dell'articolo (Markdown supportato)"
              className="min-h-[300px]"
            />
          </div>
          
          <div>
            <Label htmlFor="coverImage">URL Immagine Copertina</Label>
            <Input 
              id="coverImage" 
              name="coverImage" 
              defaultValue={post?.coverImage || ''} 
              placeholder="https://..."
            />
          </div>
          
          <div>
            <Label htmlFor="categoryId">Categoria</Label>
            <select 
              id="categoryId" 
              name="categoryId" 
              defaultValue={post?.categoryId || ''}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Nessuna categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch 
              id="published" 
              defaultChecked={post?.published || false}
            />
            <Label htmlFor="published">Pubblicato</Label>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvataggio...' : 'Salva'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
            >
              Annulla
            </Button>
            {post && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDelete}
                disabled={loading}
              >
                Elimina
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
