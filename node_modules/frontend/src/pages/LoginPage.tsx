import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/login', form);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
      <p className="mt-2 text-sm text-slate-600">Access your DevOps ProjectHub workspace.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input className="w-full rounded-lg border border-slate-300 px-4 py-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="w-full rounded-lg border border-slate-300 px-4 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white" type="submit">Login</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Need an account? <Link className="font-semibold text-sky-600" to="/register">Register</Link>
      </p>
    </section>
  );
};

export default LoginPage;
