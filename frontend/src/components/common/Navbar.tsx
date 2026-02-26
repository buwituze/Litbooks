import { Link, useNavigate, useLocation } from "react-router-dom";
import { Library, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks/useRedux";
import { logout } from "../../features/auth/authSlice";
import { useState, useRef, useEffect } from "react";

/**
 * Navigation bar component with clean, modern design
 */
const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsDropdownOpen(false);
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
                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: "#7f8f87" }}
                      >
                        {user?.full_name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {user?.full_name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Settings Button */}
                  <Link
                    to="/settings"
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
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
