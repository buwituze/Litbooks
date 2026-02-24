import { z } from 'zod';

// Password validation matching backend requirements
const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one digit')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

// Login validation schema
export const loginSchema = z.object({
  username: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Register validation schema
export const registerSchema = z.object({
  full_name: z.string().min(1, 'Full name is required').max(255, 'Full name is too long'),
  email: z.string().email('Invalid email address'),
  password: passwordValidation,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Book validation schema
export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  author: z.string().min(1, 'Author is required').max(255, 'Author is too long'),
  description: z.string().optional(),
  image_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BookFormData = z.infer<typeof bookSchema>;
