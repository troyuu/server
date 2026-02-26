import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../services/userService';
import FormField from '../../components/FormField';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function UserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState({ user_id: '', user_name: '', user_password: '' });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      getUser(id)
        .then((res) => {
          const d = res.data.data;
          setForm({ user_id: d.user_id || '', user_name: d.user_name || '', user_password: '' });
        })
        .catch(() => setError('Failed to load user'))
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
      if (payload.user_id) payload.user_id = Number(payload.user_id);
      if (isEdit) {
        await updateUser(id, { user_name: payload.user_name, user_password: payload.user_password });
      } else {
        await createUser(payload);
      }
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{isEdit ? 'Edit User' : 'New User'}</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEdit && (
            <FormField label="User ID" name="user_id" value={form.user_id} onChange={handleChange} required />
          )}
          <FormField label="Username" name="user_name" value={form.user_name} onChange={handleChange} required />
          <FormField label="Password" name="user_password" type="password" value={form.user_password} onChange={handleChange} required={!isEdit} placeholder={isEdit ? 'Leave blank to keep current' : ''} />
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => navigate('/admin/users')}
              className="rounded-lg border px-6 py-2 text-gray-700 hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
