import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory, createCategory, updateCategory } from '../../services/categoryService';
import FormField from '../../components/FormField';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState({ category_id: '', category_name: '' });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      getCategory(id)
        .then((res) => {
          const d = res.data.data;
          setForm({ category_id: d.category_id || '', category_name: d.category_name || '' });
        })
        .catch(() => setError('Failed to load category'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await updateCategory(id, form);
      } else {
        await createCategory(form);
      }
      navigate('/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{isEdit ? 'Edit Category' : 'New Category'}</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Category ID" name="category_id" value={form.category_id} onChange={handleChange} required={!isEdit} placeholder="e.g. CAT-001" />
          <FormField label="Category Name" name="category_name" value={form.category_name} onChange={handleChange} />
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => navigate('/categories')}
              className="rounded-lg border px-6 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
