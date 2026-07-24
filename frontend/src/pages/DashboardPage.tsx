import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
          <p className="mt-2 text-slate-600">Your authentication details.</p>
        </div>
        <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium" onClick={handleLogout}>Logout</button>
      </div>
      <div className="mt-8 grid gap-4 rounded-xl bg-slate-50 p-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Name</p>
          <p className="mt-1 text-lg text-slate-900">{user?.firstName} {user?.lastName}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email</p>
          <p className="mt-1 text-lg text-slate-900">{user?.email}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Role</p>
          <p className="mt-1 text-lg text-slate-900">{user?.role}</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
