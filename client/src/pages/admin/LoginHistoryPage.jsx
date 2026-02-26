import { useState, useEffect } from 'react';
import { getLoginHistory } from '../../services/authService';
import DataTable from '../../components/DataTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function LoginHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLoginHistory()
      .then((res) => setHistory(res.data.data || []))
      .catch(() => setError('Failed to load login history'))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'id', label: '#' },
    { key: 'user_id', label: 'User ID' },
    { key: 'user_name', label: 'Username' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Login History</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      <DataTable columns={columns} data={history} searchField="user_name" />
    </div>
  );
}
