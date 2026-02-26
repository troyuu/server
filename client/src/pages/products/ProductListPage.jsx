import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import DataTable from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data || []);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteTarget.product_id);
      setDeleteTarget(null);
      load();
    } catch {
      setError('Failed to delete product');
    }
  };

  const columns = [
    { key: 'product_id', label: 'ID' },
    { key: 'product_info', label: 'Name' },
    { key: 'product_price', label: 'Price', render: (r) => r.product_price != null ? `$${r.product_price}` : '—' },
    { key: 'product_category', label: 'Category' },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/products/${r.product_id}/edit`); }}
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
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button onClick={() => navigate('/products/new')}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Add Product
        </button>
      </div>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DataTable columns={columns} data={products} searchField="product_info"
        onRowClick={(r) => navigate(`/products/${r.product_id}`)} />
      <ConfirmDialog open={!!deleteTarget} title="Delete Product"
        message={`Delete product "${deleteTarget?.product_info}"?`}
        onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
