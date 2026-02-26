import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, deleteProduct } from '../../services/productService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data.data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    await deleteProduct(id);
    navigate('/products');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{product?.product_info || 'Product'}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/products/${id}/edit`)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Edit</button>
          <button onClick={() => setShowDelete(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Delete</button>
          <button onClick={() => navigate('/products')}
            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50">Back</button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <dl className="space-y-4">
          {[
            ['Product ID', product?.product_id],
            ['Name', product?.product_info],
            ['Price', product?.product_price != null ? `$${product.product_price}` : '—'],
            ['Description', product?.product_description],
            ['Category', product?.product_category],
          ].map(([label, val]) => (
            <div key={label}>
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-gray-900">{val || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ConfirmDialog open={showDelete} title="Delete Product"
        message={`Delete "${product?.product_info}"?`}
        onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />
    </div>
  );
}
