import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Auth layout for login and register pages
 * Redirects to home if user is already authenticated
 */
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/books" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">📚 Litbooks</h1>
          <p className="mt-2 text-sm text-gray-600">
            Your personal library manager
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
