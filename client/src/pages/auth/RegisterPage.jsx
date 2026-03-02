import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ErrorAlert from '../../components/ErrorAlert';

export default function RegisterPage() {
  const [form, setForm] = useState({
    user_id: '',
    user_name: '',
    user_password: '',
    f_name: '',
    l_name: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = { ...form };
      if (payload.age) payload.age = Number(payload.age);
      if (payload.user_id) payload.user_id = Number(payload.user_id);
      await register(payload);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <h2 className="mb-1 text-center text-xl font-bold text-gray-800">Create Account</h2>
      <p className="mb-6 text-center text-sm text-gray-500">Join us and start shopping</p>
      <ErrorAlert message={error} onClose={() => setError('')} />
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">User ID <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                </svg>
              </span>
              <input name="user_id" value={form.user_id} onChange={handleChange} required placeholder="ID"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <input name="user_name" value={form.user_name} onChange={handleChange} required placeholder="Username"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </span>
            <input type="password" name="user_password" value={form.user_password} onChange={handleChange} required placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">First Name</label>
            <input name="f_name" value={form.f_name} onChange={handleChange} placeholder="John"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 px-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Last Name</label>
            <input name="l_name" value={form.l_name} onChange={handleChange} placeholder="Doe"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 px-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Age</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="25"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 px-3 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100">
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account...
            </span>
          ) : 'Create Account'}
        </button>
      </form>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign In</Link>
      </p>
    </>
  );
}
