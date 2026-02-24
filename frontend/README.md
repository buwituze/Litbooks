# Litbooks Frontend

A modern React + TypeScript frontend application for managing your personal book library.

## Features

✨ **Core Functionality**

- User authentication (login/register)
- Book management (create, read, update, delete)
- Search and filter books
- Personal book collection

🎨 **UI/UX**

- Responsive design with Tailwind CSS
- Skeleton loaders for better UX
- Loading states and error handling
- Clean and intuitive interface
- Debounced search input

⚙️ **Technical Features**

- Redux Toolkit for state management
- React Router with protected routes
- Form validation with Zod
- Custom React hooks
- Lazy loading routes
- Error boundaries
- Optimistic UI updates
- Component testing with Vitest

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework

## Project Structure

```
src/
├── api/              # API client and endpoints
│   ├── axios.ts      # Axios instance configuration
│   ├── authApi.ts    # Authentication API calls
│   └── booksApi.ts   # Books API calls
├── components/       # Reusable components
│   ├── common/       # Common UI components
│   └── skeletons/    # Skeleton loaders
├── features/         # Redux slices
│   ├── auth/         # Authentication slice
│   └── books/        # Books slice
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── pages/            # Page components
├── routes/           # Routing configuration
├── tests/            # Test files
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main App component
├── main.tsx          # Entry point
└── store.ts          # Redux store configuration
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 11.x or higher

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL:

```
VITE_API_URL=http://localhost:8000
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

### Testing

Run tests:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Custom Hooks

- **useAuth** - Authentication state and user data
- **useDebounce** - Debounce value changes
- **useRedux** - Typed Redux hooks
- **useLoading** - Loading state management
- **useIsMounted** - Component mount status

## Features Implementation

### Protected Routes

Routes that require authentication are wrapped with `ProtectedRoute` component.

### Form Validation

All forms use `react-hook-form` with `zod` schema validation.

### Optimistic Updates

Book creation and deletion use optimistic updates for better UX.

### Error Handling

- Error boundaries catch and display component errors
- API errors are handled and displayed to users
- Form validation errors are shown inline

### Search & Filtering

- Debounced search input (500ms delay)
- Real-time filtering of books
- Search by title, author, or genre

### Loading States

- Skeleton loaders for initial loading
- Button loading states during async operations
- Full-page loader for route transitions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is part of the Litbooks application.
