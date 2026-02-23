import { CategoryForm } from '@/components/category-form';
import { getCategoryById } from '@/actions/categories';
import { notFound } from 'next/navigation';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <CategoryForm category={category} />
    </div>
  );
}
