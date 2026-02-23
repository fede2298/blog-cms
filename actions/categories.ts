'use server'

import { db } from '@/lib/db'
import { categories } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

const categorySchema = z.object({
  name: z.string().min(1, 'Il nome è obbligatorio'),
  slug: z.string().min(1, 'Lo slug è obbligatorio'),
  description: z.string().optional(),
})

export async function getCategories() {
  return await db.select().from(categories).orderBy(categories.name)
}

export async function getCategoryById(id: string) {
  const result = await db.select().from(categories).where(eq(categories.id, id))
  return result[0] || null
}

export async function createCategory(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string || null,
  }

  const parsed = categorySchema.parse(data)
  
  await db.insert(categories).values(parsed)
  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard')
}

export async function updateCategory(id: string, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string || null,
  }

  const parsed = categorySchema.parse(data)
  
  await db.update(categories).set({ ...parsed, updatedAt: new Date() }).where(eq(categories.id, id))
  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard')
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id))
  revalidatePath('/dashboard/categories')
  revalidatePath('/dashboard')
}
