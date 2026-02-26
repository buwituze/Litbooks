import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  fetchBook,
  deleteBook,
  clearCurrentBook,
} from "../features/books/booksSlice";
import { BookDetailSkeleton } from "../components/skeletons/SkeletonLoaders";
import { formatDate } from "../utils/helpers";

/**
 * Book detail page component
 */
const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentBook, isLoading, error } = useAppSelector(
    (state) => state.books,
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchBook(Number(id)));
    }
    return () => {
      dispatch(clearCurrentBook());
    };
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (id && confirm("Are you sure you want to delete this book?")) {
      await dispatch(deleteBook(Number(id)));
      navigate("/books");
    }
  };

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentBook) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Book not found</h2>
        <Link
          to="/books"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-7">
      <Link
        to="/books"
        className="text-gray-500 text-sm hover:underline mb-4 inline-block"
      >
        ← Back to books
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              {currentBook.image_url ? (
                <img
                  src={currentBook.image_url}
                  alt={currentBook.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BookOpen className="w-32 h-32 text-white" />
              )}
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {currentBook.title}
                </h1>
                <p className="text-lg text-gray-600">by {currentBook.author}</p>
              </div>
              {currentBook.tags && currentBook.tags.length > 0 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {currentBook.tags[0].name}
                </span>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <span className="font-semibold text-sm">Added:</span>
                {"  "}
                {formatDate(currentBook.created_at)}
              </div>
              <div>
                <span className="font-semibold text-sm">Last Updated:</span>
                {"  "}
                {formatDate(currentBook.updated_at)}
              </div>
              {currentBook.tags && currentBook.tags.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="font-semibold">Tags:</span>{" "}
                    {currentBook.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {currentBook.description && (
              <div className="mb-6">
                <h3 className=" text-sm mb-2">Description</h3>
                <p className="text-gray-700 text-sm">
                  {currentBook.description}
                </p>
              </div>
            )}

            {user?.role === "admin" && (
              <div className="flex space-x-4">
                <Link
                  to={`/books/${currentBook.id}/edit`}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-black/90"
                >
                  Edit Book
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
