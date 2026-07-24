import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="text-xl font-semibold text-slate-900">
          CloudMart
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          <Link to="/categories" className="hover:text-slate-900">Categories</Link>
          <Link to="/products" className="hover:text-slate-900">Products</Link>
          <Link to="/cart" className="hover:text-slate-900">Cart</Link>
          <Link to="/orders" className="hover:text-slate-900">Orders</Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">{user?.firstName}</span>
              <button onClick={handleLogout} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="rounded-lg bg-slate-900 px-3 py-2 text-white">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
