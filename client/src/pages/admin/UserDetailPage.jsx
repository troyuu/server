import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, deleteUser } from '../../services/userService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getUser(id)
      .then((res) => setUser(res.data.data))
      .catch(() => setError('User not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    await deleteUser(id);
    navigate('/admin/users');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{user?.user_name || 'User'}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/admin/users/${id}/edit`)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Edit</button>
          <button onClick={() => setShowDelete(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Delete</button>
          <button onClick={() => navigate('/admin/users')}
            className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50">Back</button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <dl className="space-y-4">
          {[
            ['User ID', user?.user_id],
            ['Username', user?.user_name],
          ].map(([label, val]) => (
            <div key={label}>
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-gray-900">{val ?? '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ConfirmDialog open={showDelete} title="Delete User"
        message={`Delete "${user?.user_name}"?`}
        onConfirm={handleDelete} onCancel={() => setShowDelete(false)} />
    </div>
  );
}
