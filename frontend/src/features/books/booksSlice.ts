import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { booksApi } from '../../api/booksApi';
import type { Book, CreateBookInput, UpdateBookInput } from '../../types';

interface BooksState {
  books: Book[];
  currentBook: Book | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filteredBooks: Book[];
}

const initialState: BooksState = {
  books: [],
  currentBook: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  filteredBooks: [],
};

// Async thunks
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (params: { skip?: number; limit?: number; search?: string; tag?: string } | undefined, { rejectWithValue }) => {
    try {
      const books = await booksApi.getBooks(params);
      return books;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch books');
    }
  }
);

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (id: number, { rejectWithValue }) => {
    try {
      const book = await booksApi.getBook(id);
      return book;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch book');
    }
  }
);

export const createBook = createAsyncThunk(
  'books/createBook',
  async (book: CreateBookInput, { rejectWithValue }) => {
    try {
      const newBook = await booksApi.createBook(book);
      return newBook;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to create book');
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, book }: { id: number; book: UpdateBookInput }, { rejectWithValue }) => {
    try {
      const updatedBook = await booksApi.updateBook(id, book);
      return updatedBook;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update book');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id: number, { rejectWithValue }) => {
    try {
      await booksApi.deleteBook(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete book');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      // Filter books based on search query
      if (action.payload) {
        state.filteredBooks = state.books.filter(
          (book) =>
            book.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            book.author.toLowerCase().includes(action.payload.toLowerCase()) ||
            book.tags?.some(tag => tag.name.toLowerCase().includes(action.payload.toLowerCase()))
        );
      } else {
        state.filteredBooks = state.books;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
    },
    // Optimistic update for book creation
    addBookOptimistically: (state, action: PayloadAction<Book>) => {
      state.books.unshift(action.payload);
      state.filteredBooks.unshift(action.payload);
    },
    // Optimistic update for book deletion
    removeBookOptimistically: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
      state.filteredBooks = state.filteredBooks.filter((book) => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch books
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.filteredBooks = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch single book
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create book
    builder
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.unshift(action.payload);
        state.filteredBooks.unshift(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update book
    builder
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        const filteredIndex = state.filteredBooks.findIndex((book) => book.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredBooks[filteredIndex] = action.payload;
        }
        if (state.currentBook?.id === action.payload.id) {
          state.currentBook = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete book
    builder
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((book) => book.id !== action.payload);
        state.filteredBooks = state.filteredBooks.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setSearchQuery, 
  clearError, 
  clearCurrentBook,
  addBookOptimistically,
  removeBookOptimistically
} = booksSlice.actions;

export default booksSlice.reducer;
