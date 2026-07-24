import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';

const isAuthenticated = false;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
