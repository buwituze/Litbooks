import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import type { Book } from "../../types";
import { truncateText, formatDate } from "../../utils/helpers";

interface BookCardProps {
  book: Book;
  onDelete?: (id: number) => void;
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
          {book.image_url ? (
            <img
              src={book.image_url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="w-16 h-16 text-white" />
          )}
        </div>
        {book.tags && book.tags.length > 0 && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {book.tags[0].name}
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
        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {book.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatDate(book.created_at)}</span>
        </div>

        {showActions && (
          <div className="mt-4 flex space-x-2">
            <Link
              to={`/books/${book.id}/edit`}
              className="flex-1 text-center px-3 py-1 bg-black text-white text-sm rounded hover:bg-black/90"
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
