# Litbooks Frontend

Modern React 19 + TypeScript single-page application for the Litbooks book management platform. Features Redux Toolkit for state management, Tailwind CSS for styling, and comprehensive testing with Vitest.

## Features

**User Features:**

- User authentication (register/login)
- Browse and search books with real-time filtering
- View detailed book information
- Manage personal book collection
- User profile and settings
- Password management

**UI/UX:**

- Fully responsive design
- Skeleton loaders for smooth loading states
- Debounced search input (500ms)
- Loading spinners and progress indicators
- Error boundaries for graceful error handling
- Clean, modern interface with Tailwind CSS
- Optimistic UI updates for better UX

**Technical Features:**

- Type-safe TypeScript throughout
- Redux Toolkit for global state management
- Protected routes for authenticated pages
- Lazy loading for code splitting
- Form validation with Zod schemas
- Custom React hooks for common patterns
- Component testing with Vitest
- Error handling at multiple levels

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - Simplified Redux with async thunks
- **React Router** - Client-side routing with v7
- **React Hook Form** - Performant form management
- **Zod** - Runtime type validation
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Vitest** - Fast unit testing framework
- **Testing Library** - User-centric testing utilities

## Project Structure

```
frontend/src/
├── api/                    # API layer
│   ├── axios.ts            # Axios instance with interceptors
│   ├── authApi.ts          # Authentication API calls
│   └── booksApi.ts         # Books API calls
├── components/             # Reusable components
│   ├── common/             # Shared components
│   │   ├── BookCard.tsx    # Book display card
│   │   ├── BookForm.tsx    # Book creation/edit form
│   │   ├── ErrorBoundary.tsx # Error boundary wrapper
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── SearchBar.tsx   # Search input with debounce
│   └── skeletons/          # Loading skeletons
│       └── SkeletonLoaders.tsx
├── features/               # Redux slices
│   ├── auth/               # Authentication state
│   │   └── authSlice.ts
│   └── books/              # Books state
│       └── booksSlice.ts
├── hooks/                  # Custom React hooks
│   ├── index.ts            # Barrel export
│   ├── useAuth.ts          # Auth hook
│   ├── useDebounce.ts      # Debounce hook
│   ├── useIsMounted.ts     # Mount status hook
│   ├── useLoading.ts       # Loading state hook
│   └── useRedux.ts         # Typed Redux hooks
├── layouts/                # Layout components
│   ├── AuthLayout.tsx      # Layout for login/register
│   └── MainLayout.tsx      # Main app layout with navbar
├── pages/                  # Page components
│   ├── HomePage.tsx        # Landing page
│   ├── BooksPage.tsx       # Browse all books
│   ├── BookDetailPage.tsx  # Single book view
│   ├── MyBooksPage.tsx     # User's book management
│   ├── ProfilePage.tsx     # User profile
│   ├── SettingsPage.tsx    # User settings
│   ├── LoginPage.tsx       # Login form
│   ├── RegisterPage.tsx    # Registration form
│   └── NotFoundPage.tsx    # 404 page
├── routes/                 # Routing configuration
│   ├── index.tsx           # Route definitions
│   └── ProtectedRoute.tsx  # Auth guard component
├── tests/                  # Test files
│   ├── setup.ts            # Test configuration
│   ├── HomePage.test.tsx   # Example component test
│   └── useDebounce.test.tsx # Example hook test
├── types/                  # TypeScript type definitions
│   └── index.ts            # Shared types
├── utils/                  # Utility functions
│   ├── helpers.ts          # Helper functions
│   └── validation.ts       # Validation utilities
├── App.tsx                 # Root component
├── main.tsx                # Application entry point
├── store.ts                # Redux store configuration
└── index.css               # Global styles and Tailwind directives
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 11.x or higher
- Backend API running (see backend README)

### Installation

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

Features during development:

- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- ESLint integration

### Build for Production

Build the application:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory with:

- Minified JavaScript and CSS
- Code splitting for lazy-loaded routes
- Asset optimization
- Type checking

Preview the production build locally:

```bash
npm run preview
```

## Testing

### Run Tests

```bash
npm run test        # Run tests in watch mode
npm run test:ui     # Open Vitest UI
npm run test:coverage # Generate coverage report
```

### Test Structure

Tests are located in the `src/tests/` directory and cover:

- Component rendering and behavior
- Custom hook logic
- User interactions
- API integration

Example test files:

- `HomePage.test.tsx` - Component testing example
- `useDebounce.test.tsx` - Custom hook testing example

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

ESLint is configured to enforce:

- React best practices
- TypeScript type safety
- React Hooks rules
- Code consistency

### Type Checking

TypeScript is configured with strict mode for maximum type safety:

```bash
npm run build  # Includes type checking
```

## Application Pages

### Public Pages

- **Home (`/`)** - Landing page with app overview
- **Books (`/books`)** - Browse all books with search and filters
- **Book Detail (`/books/:id`)** - View detailed information about a book
- **Login (`/login`)** - User login form
- **Register (`/register`)** - User registration form

### Protected Pages (Requires Authentication)

- **My Books (`/my-books`)** - Manage your book collection (admin: create/edit/delete)
- **Profile (`/profile`)** - View and edit user profile
- **Settings (`/settings`)** - User account settings

## State Management

### Redux Slices

**Auth Slice (`features/auth/authSlice.ts`)**

- User authentication state
- Login/logout actions
- User profile data
- Token management

**Books Slice (`features/books/booksSlice.ts`)**

- Books catalog state
- CRUD operations
- Search and filter state
- Loading and error states

### Using Redux

```typescript
import { useAppSelector, useAppDispatch } from "./hooks/useRedux";
import { fetchBooks } from "./features/books/booksSlice";

function MyComponent() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.items);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
}
```

## Custom Hooks

**useAuth** - Access authentication state and user info

```typescript
const { user, isAuthenticated, isLoading } = useAuth();
```

**useDebounce** - Debounce rapidly changing values

```typescript
const debouncedSearch = useDebounce(searchTerm, 500);
```

**useRedux** - Typed Redux hooks

```typescript
const dispatch = useAppDispatch();
const state = useAppSelector((state) => state.books);
```

**useLoading** - Manage loading states

```typescript
const { isLoading, startLoading, stopLoading } = useLoading();
```

**useIsMounted** - Check component mount status

```typescript
const isMounted = useIsMounted();
```

## API Integration

### Axios Configuration

The Axios instance in `api/axios.ts` includes:

- Base URL from environment variable
- Automatic token attachment
- Response/error interceptors
- Automatic token refresh handling

### Making API Calls

```typescript
// From auth API
import { login, register, getCurrentUser } from "./api/authApi";

// From books API
import { fetchBooks, createBook, updateBook } from "./api/booksApi";

// Usage in components
const handleLogin = async (credentials) => {
  const response = await login(credentials);
  // Handle response
};
```

## Styling

### Tailwind CSS

The project uses Tailwind CSS for styling:

- Utility-first approach
- Responsive design out of the box
- Custom configuration in `tailwind.config.js`
- Dark mode support ready (if needed)

### Custom Styles

Global styles are in `index.css`:

- Tailwind directives
- CSS variables
- Base styles
- Custom utility classes

## Form Validation

Forms use React Hook Form with Zod for validation:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## Performance Optimizations

- **Lazy Loading:** Routes are lazy-loaded for code splitting
- **Debouncing:** Search inputs are debounced to reduce API calls
- **Optimistic Updates:** UI updates before server confirmation
- **Memoization:** React.memo and useMemo where appropriate
- **Code Splitting:** Automatic route-based splitting with Vite

## Environment Variables

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:8000
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Browser Support

The application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

**API connection fails:**

- Ensure backend is running on port 8000
- Check VITE_API_URL in `.env`
- Verify CORS settings in backend

**Build fails:**

- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run build`
- Clear node_modules and reinstall if needed

**Tests fail:**

- Ensure all dependencies are installed
- Check test setup in `tests/setup.ts`
- Run `npm run test:ui` for better debugging

## Scripts Reference

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run test          # Run tests in watch mode
npm run test:ui       # Open Vitest UI
npm run test:coverage # Generate test coverage
```

## Contributing

When contributing to the frontend:

1. Follow TypeScript strict mode
2. Write tests for new features
3. Use existing patterns and hooks
4. Run linter before committing
5. Ensure all tests pass

## License

This project is part of the Litbooks application.
