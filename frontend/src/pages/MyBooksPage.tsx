import { useEffect, useState } from "react";
import { Library } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  fetchBooks,
  deleteBook,
  createBook,
  removeBookOptimistically,
} from "../features/books/booksSlice";
import { BookCard } from "../components/common/BookCard";
import { BookForm } from "../components/common/BookForm";
import { BookListSkeleton } from "../components/skeletons/SkeletonLoaders";
import type { BookFormData } from "../utils/validation";
import type { Book } from "../types";
import { useNavigate } from "react-router-dom";

/**
 * My Books page - shows books created by the current admin user
 * Only accessible to admin users
 */
const MyBooksPage = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector((state) => state.books);
  const { user } = useAppSelector((state) => state.auth);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/books");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Filter books created by current user
  const myBooks = books.filter((book) => book.creator_id === user?.id);

  const handleDelete = async (id: number) => {
    // Optimistic update
    dispatch(removeBookOptimistically(id));
    await dispatch(deleteBook(id));
  };

  const handleAddBook = async (data: BookFormData) => {
    const result = await dispatch(createBook(data));
    if (createBook.fulfilled.match(result)) {
      setShowAddModal(false);
      dispatch(fetchBooks()); // Refresh the list
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 mt-7">
        <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#7f8f87] text-white rounded-md hover:bg-[#7f8f87]/90 transition"
        >
          + Add Book
        </button>
      </div>

      {isLoading && !myBooks.length ? (
        <BookListSkeleton />
      ) : myBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Library className="w-20 h-20 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No books yet
          </h3>
          <p className="text-gray-500 mb-4">
            Start building your library by adding your first book!
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/90 transition"
          >
            Add Your First Book
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            You have {myBooks.length} {myBooks.length === 1 ? "book" : "books"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBooks.map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDelete}
                showActions
              />
            ))}
          </div>
        </>
      )}

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Book</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>
            <BookForm
              onSubmit={handleAddBook}
              isLoading={isLoading}
              submitLabel="Add Book"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooksPage;
