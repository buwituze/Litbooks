import { useEffect, useCallback } from "react";
import { Library } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchBooks, setSearchQuery } from "../features/books/booksSlice";
import { BookCard } from "../components/common/BookCard";
import { SearchBar } from "../components/common/SearchBar";
import { BookListSkeleton } from "../components/skeletons/SkeletonLoaders";
import type { Book } from "../types";

/**
 * Books page component with search and filter
 */
const BooksPage = () => {
  const dispatch = useAppDispatch();
  const { filteredBooks, isLoading, error, searchQuery } = useAppSelector(
    (state) => state.books,
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

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
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
        </div>

        <div className="max-w-xl">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by title, author, or genre..."
            initialValue={searchQuery}
          />
        </div>
      </div>

      {isLoading && !filteredBooks.length ? (
        <BookListSkeleton />
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Library className="w-20 h-20 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No books found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try a different search term"
              : "Start by adding your first book!"}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredBooks.length}{" "}
            {filteredBooks.length === 1 ? "book" : "books"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BooksPage;
