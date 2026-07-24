import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '@/services/api';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Category, Product } from '@/types/commerce';

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  categoryId: string;
}

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ProductFormValues>({
    defaultValues: { name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' }
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/api/products')).data
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/api/categories')).data
  });

  const createProductMutation = useMutation({
    mutationFn: async (payload: ProductFormValues) => api.post('/api/products', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: async (product: Product) => api.post('/api/cart/items', { productId: product.id, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Added to cart');
    }
  });

  const onSubmit = (values: ProductFormValues) => {
    createProductMutation.mutate(values);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
        <p className="mt-2 text-slate-600">Create products and add them to the cart.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4 md:grid-cols-2">
          <input {...register('name', { required: true })} className="rounded-lg border border-slate-300 px-4 py-2" placeholder="Name" />
          <input {...register('price', { required: true })} className="rounded-lg border border-slate-300 px-4 py-2" placeholder="Price" />
          <input {...register('stock', { required: true })} className="rounded-lg border border-slate-300 px-4 py-2" placeholder="Stock" />
          <input {...register('imageUrl')} className="rounded-lg border border-slate-300 px-4 py-2" placeholder="Image URL" />
          <textarea {...register('description')} className="md:col-span-2 rounded-lg border border-slate-300 px-4 py-2" placeholder="Description" />
          <select {...register('categoryId', { required: true })} className="rounded-lg border border-slate-300 px-4 py-2">
            <option value="">Select category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">Create product</button>
        </form>
      </div>
      {isLoading ? <LoadingSpinner /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCartMutation.mutate(product)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
