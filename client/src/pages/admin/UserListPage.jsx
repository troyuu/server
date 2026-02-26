import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/userService';
import DataTable from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data || []);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    try {
      await deleteUser(deleteTarget.user_id);
      setDeleteTarget(null);
      load();
    } catch {
      setError('Failed to delete user');
    }
  };

  const columns = [
    { key: 'user_id', label: 'User ID' },
    { key: 'user_name', label: 'Username' },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/users/${r.user_id}/edit`); }}
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
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <button onClick={() => navigate('/admin/users/new')}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Add User
        </button>
      </div>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DataTable columns={columns} data={users} searchField="user_name"
        onRowClick={(r) => navigate(`/admin/users/${r.user_id}`)} />
      <ConfirmDialog open={!!deleteTarget} title="Delete User"
        message={`Delete user "${deleteTarget?.user_name}"?`}
        onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
