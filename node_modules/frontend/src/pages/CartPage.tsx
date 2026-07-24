import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { type Cart } from '@/types/commerce';

const CartPage = () => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: async () => (await api.get('/api/cart')).data
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => api.put(`/api/cart/items/${id}`, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/cart/items/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => api.post('/api/orders/checkout'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Checkout successful');
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Cart</h2>
        <p className="mt-2 text-slate-600">Review your items and complete checkout.</p>
      </div>
      {cart?.items.length ? (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-900">{item.product?.name}</p>
                <p className="text-sm text-slate-600">${item.product?.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: Math.max(1, (item.quantity || 1) - 1) })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">-</button>
                <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                <button onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: (item.quantity || 1) + 1 })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">+</button>
                <button onClick={() => removeItemMutation.mutate(item.id)} className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white">Remove</button>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <button onClick={() => checkoutMutation.mutate()} className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">Checkout</button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">Your cart is empty.</div>
      )}
    </div>
  );
};

export default CartPage;
