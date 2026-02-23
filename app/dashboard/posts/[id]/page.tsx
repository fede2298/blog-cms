import { PostForm } from '@/components/post-form';
import { getCategories } from '@/actions/categories';
import { getPostById } from '@/actions/posts';
import { notFound } from 'next/navigation';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  const categories = await getCategories();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <PostForm post={post} categories={categories} />
    </div>
  );
}
