# Litbooks

A modern full-stack book management platform with user authentication and role-based access control.

## What is Litbooks?

Litbooks is a mini-Goodreads clone that allows users to browse books and admins to manage a book catalog. It features a React frontend with TypeScript and a FastAPI backend with PostgreSQL database.

## Project Structure

```
Litbooks/
├── backend/           # FastAPI REST API
├── frontend/          # React + TypeScript SPA
├── package.json       # Root package file
└── README.md          # This file
```

## Features

**User Features:**

- Browse and search books
- View book details
- User authentication (register/login)
- Profile management
- Password reset functionality

**Admin Features:**

- Create, update, and delete books
- Manage book tags
- Full book catalog control

**Technical Features:**

- JWT-based authentication with role-based access
- Real-time search with debouncing
- Responsive design
- Optimistic UI updates
- Protected routes
- Error boundaries
- Skeleton loading states

## Tech Stack

**Frontend:**

- React 19 with TypeScript
- Redux Toolkit (state management)
- React Router (navigation)
- Tailwind CSS (styling)
- React Hook Form + Zod (forms & validation)
- Axios (HTTP client)
- Vite (build tool)
- Vitest (testing)

**Backend:**

- FastAPI (Python web framework)
- SQLAlchemy with async support
- PostgreSQL database
- JWT authentication
- Pydantic validation

## Quick Start

### Prerequisites

- Python 3.9+
- Node.js 20+
- PostgreSQL (or use SQLite for development)

### 1. Clone and Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/litbooks
SECRET_KEY=your-secret-key-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123!
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend will be available at http://localhost:8000

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend will be available at http://localhost:5173

### 3. Access the Application

- **Frontend:** http://localhost:5173
- **API Docs:** http://localhost:8000/docs
- **API Alternative Docs:** http://localhost:8000/redoc

An admin user will be automatically created on first run using the credentials from your `.env` file.

## How to Use

### For Regular Users

1. Visit http://localhost:5173
2. Click "Register" to create an account
3. Browse books on the Books page
4. Use the search bar to find specific books
5. Click on a book to view details

### For Admin Users

1. Login with admin credentials
2. Navigate to "My Books" to manage books
3. Click "Add Book" to create new books
4. Edit or delete books you've created
5. Add tags to categorize books

## Testing

### Backend Testing

The backend includes interactive API documentation:

```bash
# Start the backend server
cd backend
uvicorn main:app --reload
```

Visit http://localhost:8000/docs to test all endpoints interactively.

### Frontend Testing

```bash
cd frontend
npm run test          # Run tests
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Manual Testing Example

1. **Register a user:**
   - Go to /register
   - Fill in the form with valid data
   - Submit to create account

2. **Login:**
   - Go to /login
   - Enter credentials
   - You'll be redirected to home page

3. **Browse books:**
   - Navigate to /books
   - Use search to filter books
   - Click a book to view details

## API Overview

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login (OAuth2 form)
- `POST /auth/login/json` - Login (JSON)
- `GET /auth/me` - Get current user info
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/change-password` - Change password (authenticated)

### Books Endpoints

- `POST /books/` - Create book (admin only)
- `GET /books/` - List books with search/filter
- `GET /books/{id}` - Get book details
- `PUT /books/{id}` - Update book (creator only)
- `DELETE /books/{id}` - Delete book (creator only)
- `GET /books/tags/all` - Get all available tags

## Password Requirements

All passwords must have:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/litbooks
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123!
ADMIN_FULL_NAME=Admin User
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

## Development Notes

- CORS is enabled for all origins in development (update for production)
- Database tables are created automatically on startup
- Admin user is created automatically if it doesn't exist
- Password reset tokens are printed to console in development
- Frontend uses lazy loading for routes to improve performance

## Documentation

For detailed information:

- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)

## License

This project is for educational purposes.
