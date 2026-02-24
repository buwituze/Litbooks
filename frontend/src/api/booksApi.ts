import { axiosInstance } from './axios';
import type { Book, CreateBookInput, UpdateBookInput } from '../types';

export const booksApi = {
  getBooks: async (params?: {
    skip?: number;
    limit?: number;
    search?: string;
    tag?: string;
  }): Promise<Book[]> => {
    const response = await axiosInstance.get<Book[]>('/books/', { params });
    return response.data;
  },

  getBook: async (id: number): Promise<Book> => {
    const response = await axiosInstance.get<Book>(`/books/${id}`);
    return response.data;
  },

  createBook: async (book: CreateBookInput): Promise<Book> => {
    const response = await axiosInstance.post<Book>('/books/', book);
    return response.data;
  },

  updateBook: async (id: number, book: UpdateBookInput): Promise<Book> => {
    const response = await axiosInstance.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/books/${id}`);
  },
};
