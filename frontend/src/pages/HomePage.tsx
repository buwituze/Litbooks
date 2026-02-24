import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Home page component
 */
const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920')`,
        }}
      >
        <div className="text-center text-white px-4 z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Welcome to Litbooks
          </h1>
          <p className="text-2xl md:text-3xl mb-8 drop-shadow-md">
            Your personal library management system
          </p>
          <div className="space-x-4">
            <Link
              to="/books"
              className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Books
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="inline-block px-10 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Manage Your Library
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-6 text-center">📖</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                Organize
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Keep track of all your books in one place. Categorize, tag, and
                organize your collection effortlessly.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-6 text-center">🔍</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                Search
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Find books quickly with our powerful search. Filter by title,
                author, genre, or any custom criteria.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-6 text-center">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                Manage
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Add, edit, and delete books effortlessly. Keep your library
                up-to-date with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      {!isAuthenticated && (
        <div className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of book lovers who trust Litbooks to manage their
              personal libraries.
            </p>
            <Link
              to="/register"
              className="inline-block px-12 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Create Your Free Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
