'use server'

import { db } from '@/lib/db'
import { posts, categories, users } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth, currentUser } from '@clerk/nextjs/server'
import { eq, asc } from 'drizzle-orm'
import { randomUUID } from 'crypto'

const postSchema = z.object({
  title: z.string().min(1, 'Il titolo è obbligatorio'),
  slug: z.string().min(1, 'Lo slug è obbligatorio'),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1, 'Il contenuto è obbligatorio'),
  coverImage: z.string().nullable().optional(),
  published: z.boolean().optional(),
  categoryId: z.string().nullable().optional(),
})

async function getOrCreateUser() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  let userResult = await db.select().from(users).where(eq(users.clerkId, userId))
  let user = userResult[0]

  if (!user) {
    const clerkUser = await currentUser()
    const newUser = {
      clerkId: userId,
      email: clerkUser?.emailAddresses[0]?.emailAddress || '',
      name: clerkUser?.firstName && clerkUser?.lastName 
        ? `${clerkUser.firstName} ${clerkUser.lastName}`
        : clerkUser?.username || clerkUser?.firstName || 'User',
      imageUrl: clerkUser?.imageUrl || null,
    }
    
    await db.insert(users).values({
      id: randomUUID(),
      ...newUser,
    })
    
    userResult = await db.select().from(users).where(eq(users.clerkId, userId))
    user = userResult[0]
  }

  return user!
}

export async function getPosts(includeUnpublished = false) {
  let query = db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    excerpt: posts.excerpt,
    published: posts.published,
    createdAt: posts.createdAt,
    updatedAt: posts.updatedAt,
    categoryId: posts.categoryId,
    categoryName: categories.name,
  })
  .from(posts)
  .leftJoin(categories, eq(posts.categoryId, categories.id))
  .orderBy(asc(posts.createdAt))

  if (!includeUnpublished) {
    query = query.where(eq(posts.published, true)) as typeof query
  }
  
  return await query
}

export async function getPostById(id: string) {
  const result = await db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    excerpt: posts.excerpt,
    content: posts.content,
    coverImage: posts.coverImage,
    published: posts.published,
    createdAt: posts.createdAt,
    categoryId: posts.categoryId,
  })
  .from(posts)
  .where(eq(posts.id, id))
  
  return result[0] || null
}

export async function getPostBySlug(slug: string) {
  const result = await db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    excerpt: posts.excerpt,
    content: posts.content,
    coverImage: posts.coverImage,
    published: posts.published,
    createdAt: posts.createdAt,
    publishedAt: posts.publishedAt,
    categoryName: categories.name,
  })
  .from(posts)
  .leftJoin(categories, eq(posts.categoryId, categories.id))
  .where(eq(posts.slug, slug))
  
  return result[0] || null
}

export async function createPost(formData: FormData) {
  const user = await getOrCreateUser()

  const getValue = (key: string) => {
    const val = formData.get(key)
    return val === '' || val === null ? undefined : val
  }

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: getValue('excerpt') || undefined,
    content: formData.get('content') as string,
    coverImage: getValue('coverImage') || undefined,
    published: formData.get('published') === 'on',
    categoryId: getValue('categoryId') || undefined,
  }

  const parsed = postSchema.parse(data)

  await db.insert(posts).values({
    title: parsed.title,
    slug: parsed.slug,
    excerpt: parsed.excerpt ?? null,
    content: parsed.content,
    coverImage: parsed.coverImage ?? null,
    published: parsed.published ?? false,
    categoryId: parsed.categoryId ?? null,
    authorId: user.id,
    publishedAt: parsed.published ? new Date() : null,
  })
  revalidatePath('/dashboard/posts')
  revalidatePath('/dashboard')
}

export async function updatePost(id: string, formData: FormData) {
  const getValue = (key: string) => {
    const val = formData.get(key)
    return val === '' || val === null ? undefined : val
  }

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: getValue('excerpt') || undefined,
    content: formData.get('content') as string,
    coverImage: getValue('coverImage') || undefined,
    published: formData.get('published') === 'on',
    categoryId: getValue('categoryId') || undefined,
  }

  const parsed = postSchema.parse(data)
  
  await db.update(posts).set({
    title: parsed.title,
    slug: parsed.slug,
    excerpt: parsed.excerpt ?? null,
    content: parsed.content,
    coverImage: parsed.coverImage ?? null,
    published: parsed.published ?? false,
    categoryId: parsed.categoryId ?? null,
    updatedAt: new Date(),
    publishedAt: parsed.published ? new Date() : null,
  }).where(eq(posts.id, id))
  
  revalidatePath('/dashboard/posts')
  revalidatePath('/dashboard')
}

export async function deletePost(id: string) {
  await db.delete(posts).where(eq(posts.id, id))
  revalidatePath('/dashboard/posts')
  revalidatePath('/dashboard')
}
