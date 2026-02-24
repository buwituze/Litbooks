import { Link, useNavigate, useLocation } from "react-router-dom";
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
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100 mx-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 ml-10 group">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                📚
              </div>
              <span className="text-xl font-bold">Litbooks</span>
            </Link>
          </div>

          {/* Navigation Links and User Actions */}
          <div className="flex items-center gap-8">
            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/books"
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/books")
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                All Books
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/my-books"
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive("/my-books")
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  My Books
                </Link>
              )}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {user?.full_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.full_name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4 ">
                  <Link
                    to="/login"
                    className="p-10 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium text-white bg-blue-600 mr-10 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
