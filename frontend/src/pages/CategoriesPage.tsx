import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '@/services/api';
import CategoryCard from '@/components/CategoryCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Category } from '@/types/commerce';

interface CategoryFormValues {
  name: string;
}

const CategoriesPage = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<CategoryFormValues>({ defaultValues: { name: '' } });

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/api/categories')).data
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (payload: { name: string }) => api.post('/api/categories', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      reset();
    }
  });

  const onSubmit = ({ name }: CategoryFormValues) => {
    createCategoryMutation.mutate({ name });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Categories</h2>
        <p className="mt-2 text-slate-600">Create and manage product categories.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-3">
          <input {...register('name', { required: true })} className="w-full rounded-lg border border-slate-300 px-4 py-2" placeholder="Category name" />
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">Create</button>
        </form>
      </div>
      {isLoading ? <LoadingSpinner /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
