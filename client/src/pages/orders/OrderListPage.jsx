import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, getOrdersByUser, deleteOrder } from '../../services/orderService';
import { useAuth } from '../../hooks/useAuth';
import DataTable from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [myOnly, setMyOnly] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = myOnly && user?.user_id
        ? await getOrdersByUser(user.user_id)
        : await getOrders();
      setOrders(res.data.data || []);
    } catch {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [myOnly]);

  const handleDelete = async () => {
    try {
      await deleteOrder(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      setError('Failed to delete order');
    }
  };

  const columns = [
    { key: 'id', label: 'Order #' },
    { key: 'user_id', label: 'User' },
    { key: 'product_info', label: 'Product' },
    { key: 'quantity', label: 'Qty' },
    { key: 'total', label: 'Total', render: (r) => r.total != null ? `$${r.total}` : '—' },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/orders/${r.id}/edit`); }}
            className="text-sm text-indigo-600 hover:underline">Edit</button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(r); }}
            className="text-sm text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="flex gap-3">
          <button onClick={() => setMyOnly((v) => !v)}
            className={`rounded-lg border px-4 py-2 text-sm ${myOnly ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : 'text-gray-700 hover:bg-gray-50'}`}>
            {myOnly ? 'My Orders' : 'All Orders'}
          </button>
          <button onClick={() => navigate('/orders/new')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            New Order
          </button>
        </div>
      </div>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DataTable columns={columns} data={orders} searchField="product_info"
        onRowClick={(r) => navigate(`/orders/${r.id}`)} />
      <ConfirmDialog open={!!deleteTarget} title="Delete Order"
        message={`Delete order #${deleteTarget?.id}?`}
        onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
