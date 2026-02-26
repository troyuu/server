import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../../services/productService';
import FormField from '../../components/FormField';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState({
    product_id: '', product_info: '', product_price: '', product_description: '', product_category: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      getProduct(id)
        .then((res) => {
          const d = res.data.data;
          setForm({
            product_id: d.product_id || '',
            product_info: d.product_info || '',
            product_price: d.product_price ?? '',
            product_description: d.product_description || '',
            product_category: d.product_category || '',
          });
        })
        .catch(() => setError('Failed to load product'))
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
      if (payload.product_price !== '') payload.product_price = Number(payload.product_price);
      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'New Product'}</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Product ID" name="product_id" value={form.product_id} onChange={handleChange} required={!isEdit} placeholder="e.g. PROD-001" />
          <FormField label="Product Name" name="product_info" value={form.product_info} onChange={handleChange} />
          <FormField label="Price" name="product_price" type="number" value={form.product_price} onChange={handleChange} />
          <FormField label="Description" name="product_description" value={form.product_description} onChange={handleChange} />
          <FormField label="Category" name="product_category" value={form.product_category} onChange={handleChange} />
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => navigate('/products')}
              className="rounded-lg border px-6 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
