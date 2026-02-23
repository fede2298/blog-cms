import { PostForm } from '@/components/post-form';
import { getCategories } from '@/actions/categories';

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div>
      <PostForm categories={categories} />
    </div>
  );
}
