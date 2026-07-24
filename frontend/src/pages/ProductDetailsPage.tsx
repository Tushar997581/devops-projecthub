import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Product } from '@/types/commerce';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['products', id],
    queryFn: async () => (await api.get(`/api/products/${id}`)).data,
    enabled: !!id
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => api.post('/api/cart/items', { productId: product?.id, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Added to cart');
    }
  });

  if (isLoading || !product) return <LoadingSpinner />;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="h-64 rounded-2xl bg-slate-100" />
          <h2 className="mt-6 text-3xl font-semibold text-slate-900">{product.name}</h2>
          <p className="mt-3 text-slate-600">{product.description || 'Premium product from CloudMart.'}</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Category: {product.category?.name || 'Uncategorized'}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Price</p>
          <p className="mt-2 text-4xl font-semibold text-slate-900">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-sm text-slate-600">{product.stock} units currently available.</p>
          <button onClick={() => addToCartMutation.mutate()} className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
