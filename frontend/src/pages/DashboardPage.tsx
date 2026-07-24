import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import StatsCard from '@/components/StatsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Category, Order, Product } from '@/types/commerce';

const DashboardPage = () => {
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/api/products')).data
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/api/categories')).data
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => (await api.get('/api/orders')).data
  });

  const isLoading = productsLoading || categoriesLoading || ordersLoading;
  const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-slate-600">A quick overview of your CloudMart business.</p>
      </div>
      {isLoading ? <LoadingSpinner /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total Products" value={products.length} description="Products available in the catalog" />
          <StatsCard title="Total Orders" value={orders.length} description="Completed and pending orders" />
          <StatsCard title="Total Categories" value={categories.length} description="Curated product groups" />
          <StatsCard title="Total Revenue" value={`$${revenue.toFixed(2)}`} description="Placeholder revenue summary" />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
