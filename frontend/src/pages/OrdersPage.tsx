import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import DataTable from '@/components/DataTable';
import type { Order } from '@/types/commerce';

const OrdersPage = () => {
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => (await api.get('/api/orders')).data
  });

  const columns = [
    { key: 'id' as keyof Order, header: 'Order ID' },
    { key: 'status' as keyof Order, header: 'Status' },
    { key: 'totalAmount' as keyof Order, header: 'Total', render: (value: unknown) => `$${Number(value).toFixed(2)}` },
    { key: 'createdAt' as keyof Order, header: 'Date', render: (value: unknown) => new Date(String(value)).toLocaleDateString() }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Orders</h2>
        <p className="mt-2 text-slate-600">Track your purchase history.</p>
      </div>
      {isLoading ? <LoadingSpinner /> : <DataTable columns={columns} rows={orders} />}
    </div>
  );
};

export default OrdersPage;
