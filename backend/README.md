# Litbooks Backend API

FastAPI backend for managing books with authentication and CRUD operations.

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
copy .env.example .env
```

Edit `.env` and update the `SECRET_KEY`.

### 3. Run the Server

```bash
uvicorn main:app --reload
```

Access the API at `http://localhost:8000/docs`

## Project Structure

```
backend/
├── app/
│   ├── routers/
│   │   ├── auth.py          # Authentication routes
│   │   └── books.py         # Books CRUD routes
│   ├── auth.py              # Authentication utilities
│   ├── config.py            # Configuration
│   ├── database.py          # Database setup
│   ├── dependencies.py      # Dependencies
│   ├── models.py            # Database models
│   └── schemas.py           # Pydantic schemas
├── main.py                  # FastAPI application
└── requirements.txt         # Dependencies
```

## Features

- User registration and authentication (JWT)
- Password reset functionality
- Books CRUD operations
- Tag system
- Search and filtering

## API Endpoints

**Authentication:**

- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/change-password` - Change password

**Books:**

- `POST /books/` - Create book
- `GET /books/` - List books (with search/filter)
- `GET /books/{id}` - Get book details
- `PUT /books/{id}` - Update book
- `DELETE /books/{id}` - Delete book
- `GET /books/tags/all` - Get all tags

## Database Models

**User:** id, full_name, email, hashed_password, created_at, reset_token, reset_token_expiry

**Book:** id, title, author, description, image_url, created_at, updated_at, creator_id

**Tag:** id, name

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character
