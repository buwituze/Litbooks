import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, type BookFormData } from "../../utils/validation";
import type { Book } from "../../types";
import { ButtonLoader } from "./LoadingSpinner";

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  initialData?: Book;
  isLoading?: boolean;
  submitLabel?: string;
}

/**
 * Book form component with validation
 */
export const BookForm = ({
  onSubmit,
  initialData,
  isLoading = false,
  submitLabel = "Submit",
}: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          author: initialData.author,
          isbn: initialData.isbn || "",
          published_year: initialData.published_year,
          genre: initialData.genre || "",
          description: initialData.description || "",
          cover_url: initialData.cover_url || "",
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title *
        </label>
        <input
          {...register("title")}
          type="text"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Author *
        </label>
        <input
          {...register("author")}
          type="text"
          id="author"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
        {errors.author && (
          <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            {...register("isbn")}
            type="text"
            id="isbn"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          />
          {errors.isbn && (
            <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="published_year"
            className="block text-sm font-medium text-gray-700"
          >
            Published Year
          </label>
          <input
            {...register("published_year", { valueAsNumber: true })}
            type="number"
            id="published_year"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          />
          {errors.published_year && (
            <p className="mt-1 text-sm text-red-600">
              {errors.published_year.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="genre"
          className="block text-sm font-medium text-gray-700"
        >
          Genre
        </label>
        <input
          {...register("genre")}
          type="text"
          id="genre"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
        {errors.genre && (
          <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="cover_url"
          className="block text-sm font-medium text-gray-700"
        >
          Cover URL
        </label>
        <input
          {...register("cover_url")}
          type="text"
          id="cover_url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
        {errors.cover_url && (
          <p className="mt-1 text-sm text-red-600">
            {errors.cover_url.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? <ButtonLoader text={submitLabel} /> : submitLabel}
        </button>
      </div>
    </form>
  );
};
