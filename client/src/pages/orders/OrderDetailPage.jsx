import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder, deleteOrder } from '../../services/orderService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getOrder(id)
      .then((res) => setOrder(res.data.data))
      .catch(() => setError('Order not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    await deleteOrder(id);
    navigate('/orders');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Order #{order?.id}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/orders/${id}/edit`)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Edit</button>
          <button onClick={() => setShowDelete(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Delete</button>
          <button onClick={() => navigate('/orders')}
            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50">Back</button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <dl className="space-y-4">
          {[
            ['Order ID', order?.id],
            ['User ID', order?.user_id],
            ['Product ID', order?.product_id],
            ['Order User ID', order?.order_userid],
            ['Product Info', order?.product_info],
            ['Price', order?.product_price != null ? `$${order.product_price}` : '—'],
            ['Quantity', order?.quantity],
            ['Total', order?.total != null ? `$${order.total}` : '—'],
            ['Payment Mode', order?.mode_payment],
            ['Address', order?.user_address],
          ].map(([label, val]) => (
            <div key={label}>
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-gray-900">{val ?? '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ConfirmDialog open={showDelete} title="Delete Order"
        message={`Delete order #${order?.id}?`}
        onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />
    </div>
  );
}
