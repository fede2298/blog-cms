'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createCategory, updateCategory, deleteCategory, getCategoryById } from '@/actions/categories'
import { useRouter } from 'next/navigation'

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    slug: string
    description: string | null
  }
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      if (category) {
        await updateCategory(category.id, formData)
      } else {
        await createCategory(formData)
      }
      router.push('/dashboard/categories')
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!category) return
    if (!confirm('Sei sicuro di voler eliminare questa categoria?')) return
    
    setLoading(true)
    try {
      await deleteCategory(category.id)
      router.push('/dashboard/categories')
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
        <CardTitle>{category ? 'Modifica Categoria' : 'Nuova Categoria'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={category?.name} 
              required 
              placeholder="Nome categoria"
            />
          </div>
          
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input 
              id="slug" 
              name="slug" 
              defaultValue={category?.slug} 
              required 
              placeholder="slug-categoria"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Descrizione</Label>
            <Textarea 
              id="description" 
              name="description" 
              defaultValue={category?.description || ''} 
              placeholder="Descrizione opzionale"
            />
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
            {category && (
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
