import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-semibold text-slate-900">
            DevOps ProjectHub
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <Link to="/login" className="hover:text-slate-900">
              Login
            </Link>
            <Link to="/register" className="hover:text-slate-900">
              Register
            </Link>
            <Link to="/dashboard" className="hover:text-slate-900">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
