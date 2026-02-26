import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../services/categoryService';
import DataTable from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data || []);
    } catch {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteTarget.category_id);
      setDeleteTarget(null);
      load();
    } catch {
      setError('Failed to delete category');
    }
  };

  const columns = [
    { key: 'category_id', label: 'ID' },
    { key: 'category_name', label: 'Name' },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/categories/${r.category_id}/edit`); }}
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
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button onClick={() => navigate('/categories/new')}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Add Category
        </button>
      </div>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DataTable columns={columns} data={categories} searchField="category_name" />
      <ConfirmDialog open={!!deleteTarget} title="Delete Category"
        message={`Delete category "${deleteTarget?.category_name}"?`}
        onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
