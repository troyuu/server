import { useState, useEffect } from 'react';
import { getRegisteredUsers } from '../../services/authService';
import DataTable from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function RegisteredUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getRegisteredUsers()
      .then((res) => setUsers(res.data.data || []))
      .catch(() => setError('Failed to load registered users'))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'user_id', label: 'User ID' },
    { key: 'user_name', label: 'Username' },
    { key: 'f_name', label: 'First Name' },
    { key: 'l_name', label: 'Last Name' },
    { key: 'age', label: 'Age' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Registered Users</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DataTable columns={columns} data={users} searchField="user_name" />
    </div>
  );
}
