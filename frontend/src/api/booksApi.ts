import { axiosInstance } from './axios';
import type { Book, CreateBookInput, UpdateBookInput } from '../types';

export const booksApi = {
  getBooks: async (params?: {
    skip?: number;
    limit?: number;
    search?: string;
  }): Promise<Book[]> => {
    const response = await axiosInstance.get<Book[]>('/books/', { params });
    return response.data;
  },

  getBook: async (id: string): Promise<Book> => {
    const response = await axiosInstance.get<Book>(`/books/${id}`);
    return response.data;
  },

  createBook: async (book: CreateBookInput): Promise<Book> => {
    const response = await axiosInstance.post<Book>('/books/', book);
    return response.data;
  },

  updateBook: async (id: string, book: UpdateBookInput): Promise<Book> => {
    const response = await axiosInstance.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/books/${id}`);
  },

  getMyBooks: async (): Promise<Book[]> => {
    const response = await axiosInstance.get<Book[]>('/books/my-books');
    return response.data;
  },
};
