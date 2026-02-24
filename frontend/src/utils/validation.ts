import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Register validation schema
export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Book validation schema
export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().optional(),
  published_year: z.number().min(1000).max(new Date().getFullYear() + 1).optional(),
  genre: z.string().optional(),
  description: z.string().optional(),
  cover_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BookFormData = z.infer<typeof bookSchema>;
