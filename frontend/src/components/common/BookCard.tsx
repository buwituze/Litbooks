import { Link } from "react-router-dom";
import type { Book } from "../../types";
import { truncateText, formatDate } from "../../utils/helpers";

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

/**
 * Book card component
 */
export const BookCard = ({
  book,
  onDelete,
  showActions = false,
}: BookCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete && confirm("Are you sure you want to delete this book?")) {
      onDelete(book.id);
    }
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          {book.cover_url ? (
            <img
              src={book.cover_url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl">📖</span>
          )}
        </div>
        {book.genre && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition mb-1">
          {truncateText(book.title, 50)}
        </h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        {book.description && (
          <p className="text-sm text-gray-500 mb-3">
            {truncateText(book.description, 100)}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{book.published_year || "N/A"}</span>
          <span>{formatDate(book.created_at)}</span>
        </div>

        {showActions && (
          <div className="mt-4 flex space-x-2">
            <Link
              to={`/books/${book.id}/edit`}
              className="flex-1 text-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              onClick={(e) => e.stopPropagation()}
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};
