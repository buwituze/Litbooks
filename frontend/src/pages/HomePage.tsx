import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Home page component
 */
const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Litbooks 📚
        </h1>
        <p className="text-xl text-gray-600">
          Your personal library management system
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-xl font-semibold mb-2">Organize</h3>
          <p className="text-gray-600">
            Keep track of all your books in one place
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Search</h3>
          <p className="text-gray-600">
            Find books quickly with our powerful search
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2">Manage</h3>
          <p className="text-gray-600">
            Add, edit, and delete books effortlessly
          </p>
        </div>
      </div>

      <div className="space-x-4">
        {isAuthenticated ? (
          <Link
            to="/books"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-lg font-medium"
          >
            Browse Books
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-lg font-medium"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
