import { Link, useNavigate, useLocation } from "react-router-dom";
import { Library } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks/useRedux";
import { logout } from "../../features/auth/authSlice";

/**
 * Navigation bar component with clean, modern design
 */
const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Library
              className="w-8 h-8 group-hover:scale-110 transition-transform"
              style={{ color: "#7f8f87" }}
            />
            <span className="text-xl font-bold text-gray-900">Litbooks</span>
          </Link>

          {/* Navigation Links and User Actions */}
          <div className="flex items-center gap-6">
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/books"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/books")
                    ? "text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                style={isActive("/books") ? { backgroundColor: "#7f8f87" } : {}}
              >
                All Books
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/my-books"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/my-books")
                      ? "text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={
                    isActive("/my-books") ? { backgroundColor: "#7f8f87" } : {}
                  }
                >
                  My Books
                </Link>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: "#7f8f87" }}
                    >
                      {user?.full_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {user?.full_name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-20 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: "#7f8f87" }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
