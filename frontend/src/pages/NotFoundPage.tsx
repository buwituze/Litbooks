import { Link } from "react-router-dom";

/**
 * 404 Not Found page
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
