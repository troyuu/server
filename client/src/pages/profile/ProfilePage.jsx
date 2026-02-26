import { useState, useEffect } from 'react';
import { getProfile } from '../../services/authService';
import { getUserInfo, updateUserInfo } from '../../services/infoUserService';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import FormField from '../../components/FormField';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [info, setInfo] = useState({ f_name: '', l_name: '', age: '', user_address: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const profileRes = await getProfile();
        setProfile(profileRes.data.data);
        const userId = profileRes.data.data?.user_id;
        if (userId) {
          try {
            const infoRes = await getUserInfo(userId);
            const d = infoRes.data.data;
            if (d) setInfo({ f_name: d.f_name || '', l_name: d.l_name || '', age: d.age || '', user_address: d.user_address || '' });
          } catch {}
        }
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = { ...info };
      if (payload.age) payload.age = Number(payload.age);
      await updateUserInfo(profile.user_id, payload);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Profile</h1>
      <ErrorAlert message={error} onClose={() => setError('')} />
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">{success}</div>
      )}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Account Info</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">User ID:</span> {profile?.user_id}</p>
          <p><span className="font-medium">Username:</span> {profile?.user_name}</p>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Personal Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First Name" name="f_name" value={info.f_name} onChange={handleChange} />
            <FormField label="Last Name" name="l_name" value={info.l_name} onChange={handleChange} />
          </div>
          <FormField label="Age" name="age" type="number" value={info.age} onChange={handleChange} />
          <FormField label="Address" name="user_address" value={info.user_address} onChange={handleChange} />
          <button type="submit" disabled={saving}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
