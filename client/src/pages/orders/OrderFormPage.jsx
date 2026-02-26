import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder, createOrder, updateOrder } from '../../services/orderService';
import FormField from '../../components/FormField';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function OrderFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState({
    user_id: '', product_id: '', order_userid: '', product_info: '',
    product_price: '', mode_payment: '', total: '', quantity: '', user_address: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      getOrder(id)
        .then((res) => {
          const d = res.data.data;
          setForm({
            user_id: d.user_id || '', product_id: d.product_id || '',
            order_userid: d.order_userid || '', product_info: d.product_info || '',
            product_price: d.product_price ?? '', mode_payment: d.mode_payment ?? '',
            total: d.total ?? '', quantity: d.quantity ?? '', user_address: d.user_address || '',
          });
        })
        .catch(() => setError('Failed to load order'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      ['product_price', 'mode_payment', 'total', 'quantity'].forEach((k) => {
        if (payload[k] !== '') payload[k] = Number(payload[k]);
      });
      if (isEdit) {
        await updateOrder(id, payload);
      } else {
        await createOrder(payload);
      }
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save order');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{isEdit ? 'Edit Order' : 'New Order'}</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="User ID" name="user_id" value={form.user_id} onChange={handleChange} required />
            <FormField label="Product ID" name="product_id" value={form.product_id} onChange={handleChange} required />
          </div>
          <FormField label="Order User ID" name="order_userid" value={form.order_userid} onChange={handleChange} />
          <FormField label="Product Info" name="product_info" value={form.product_info} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Price" name="product_price" type="number" value={form.product_price} onChange={handleChange} />
            <FormField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Total" name="total" type="number" value={form.total} onChange={handleChange} />
            <FormField label="Payment Mode" name="mode_payment" type="number" value={form.mode_payment} onChange={handleChange} />
          </div>
          <FormField label="Address" name="user_address" value={form.user_address} onChange={handleChange} />
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => navigate('/orders')}
              className="rounded-lg border px-6 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
