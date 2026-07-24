import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
