import { CategoryForm } from '@/components/category-form';
import { getCategoryById } from '@/actions/categories';
import { notFound } from 'next/navigation';

export default async function NewCategoryPage() {
  return (
    <div>
      <CategoryForm />
    </div>
  );
}
