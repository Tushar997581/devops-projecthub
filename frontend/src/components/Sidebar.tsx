import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/categories', label: 'Categories' },
  { to: '/products', label: 'Products' },
  { to: '/cart', label: 'Cart' },
  { to: '/orders', label: 'Orders' }
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">CloudMart</h3>
      <nav className="mt-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
