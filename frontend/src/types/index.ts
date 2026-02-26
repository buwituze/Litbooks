// User and Authentication types
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  full_name: string;
  email: string;
  password: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Tag types
export interface Tag {
  id: number;
  name: string;
}

// Book types
export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  image_url?: string;
  creator_id: number;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  description?: string;
  image_url?: string;
  tags?: string[];
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
