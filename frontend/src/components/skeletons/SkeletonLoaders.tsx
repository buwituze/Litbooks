/**
 * Skeleton loader for book cards
 */
export const BookCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

/**
 * Skeleton loader for book list
 */
export const BookListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};

/**
 * Skeleton loader for book details
 */
export const BookDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="w-full h-96 bg-gray-300"></div>
          </div>
          <div className="md:w-2/3 p-8">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
            <div className="mt-6 flex space-x-4">
              <div className="h-10 bg-gray-300 rounded w-24"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Generic skeleton for text lines
 */
export const TextSkeleton = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-300 rounded"
          style={{ width: `${100 - index * 10}%` }}
        ></div>
      ))}
    </div>
  );
};
