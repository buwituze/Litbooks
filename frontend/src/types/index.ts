// User and Authentication types
export interface User {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Book types
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  published_year?: number;
  genre?: string;
  description?: string;
  cover_url?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  isbn?: string;
  published_year?: number;
  genre?: string;
  description?: string;
  cover_url?: string;
}

export interface UpdateBookInput extends Partial<CreateBookInput> {}

// API Response types
export interface ApiError {
  detail: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface FilterState {
  search: string;
  genre?: string;
  sortBy?: 'title' | 'author' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}
