# Litbooks

A mini-Goodreads platform for managing books with authentication.

## Project Structure

```
Litbooks/
├── backend/           # FastAPI backend
│   ├── app/
│   ├── main.py
│   └── README.md
└── frontend/          # Coming soon
```

## Features

### Books Management

- Create, Read, Update, Delete books
- Book attributes: title, author, description, image URL, tags
- Search and filter functionality
- Tag system

### User Authentication

- User registration with email validation
- Strong password requirements
- JWT-based authentication
- Password reset functionality
- Change password

## Quick Start

### Backend Setup

1. Navigate to backend:

```bash
cd backend
```

2. Create virtual environment:

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure environment:

```bash
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux
```

5. Run the server:

```bash
uvicorn main:app --reload
```

6. Access API documentation:

- Interactive Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

## API Overview

**Authentication Endpoints:**

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get token
- `GET /auth/me` - Get current user info
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/change-password` - Change password

**Books Endpoints:**

- `POST /books/` - Create book
- `GET /books/` - List all books (with search/filter)
- `GET /books/{id}` - Get book by ID
- `PUT /books/{id}` - Update book
- `DELETE /books/{id}` - Delete book
- `GET /books/tags/all` - Get all tags

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character

## Tech Stack

**Backend:**

- FastAPI
- SQLAlchemy (async)
- SQLite / PostgreSQL
- JWT authentication
- Pydantic validation

## Next Steps

- Frontend development (React/Vue/Angular)
- File upload for book covers
- Book reviews and ratings
- User profiles

## Documentation

For detailed backend documentation, see [backend/README.md](backend/README.md)

Edit `.env` and update the `SECRET_KEY`:

```env
SECRET_KEY=your-very-secure-secret-key-here
```

### 4. Run the Application

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:

- **Interactive Docs (Swagger)**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication

#### Register a New User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "full_name": "John Doe",
  "password": "SecurePass123!"
}
```

#### Login (OAuth2 Form)

```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=SecurePass123!
```

#### Login (JSON)

```http
POST /auth/login/json
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

#### Forgot Password

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

_Note: In development, the reset token will be printed to the console._

#### Reset Password

```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "new_password": "NewSecurePass123!"
}
```

#### Change Password

```http
POST /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "old_password": "SecurePass123!",
  "new_password": "NewSecurePass123!"
}
```

### Books

#### Create a Book

```http
POST /books/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel",
  "image_url": "https://example.com/image.jpg",
  "tags": ["classic", "fiction", "american"]
}
```

#### Get All Books

```http
GET /books/?skip=0&limit=10&search=gatsby&tag=fiction
```

Query parameters:

- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum records to return (default: 100, max: 100)
- `search`: Search in title or author
- `tag`: Filter by tag name

#### Get a Specific Book

```http
GET /books/{book_id}
```

#### Update a Book

```http
PUT /books/{book_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "tags": ["updated-tag"]
}
```

_Note: Only the book creator can update it._

#### Delete a Book

```http
DELETE /books/{book_id}
Authorization: Bearer <token>
```

_Note: Only the book creator can delete it._

#### Get All Tags

```http
GET /books/tags/all
```

## Password Requirements

Passwords must meet the following criteria:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character (!@#$%^&\*(),.?":{}|<>)

## Project Structure

```
Litbooks/
├── app/
│   ├── __init__.py
│   ├── auth.py              # Authentication utilities
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database setup
│   ├── dependencies.py      # FastAPI dependencies
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   └── routers/
│       ├── __init__.py
│       ├── auth.py          # Authentication routes
│       └── books.py         # Books CRUD routes
├── main.py                  # FastAPI application
├── requirements.txt         # Python dependencies
├── .env.example            # Example environment file
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Database

The application uses SQLite with async support (via aiosqlite). The database file (`litbooks.db`) will be created automatically on first run.

### Models

**User**

- id, full_name, email, hashed_password
- created_at, reset_token, reset_token_expiry

**Book**

- id, title, author, description, image_url
- created_at, updated_at, creator_id

**Tag**

- id, name

## Security Notes

1. **Secret Key**: Change the `SECRET_KEY` in `.env` to a secure random string in production
2. **CORS**: Update CORS settings in `main.py` to allow only specific origins in production
3. **Email**: Configure SMTP settings in `.env` for production email sending
4. **HTTPS**: Always use HTTPS in production
5. **Database**: Consider using PostgreSQL or MySQL for production instead of SQLite

## Development

To run in development mode with auto-reload:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Testing with cURL

### Register and Login

```bash
# Register
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","full_name":"Test User","password":"TestPass123!"}'

# Login
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=TestPass123!"
```

### Create and Get Books

```bash
# Set your token
TOKEN="your-access-token-here"

# Create a book
curl -X POST "http://localhost:8000/books/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","description":"Dystopian novel","tags":["dystopian","classic"]}'

# Get all books
curl "http://localhost:8000/books/"
```

## License

This project is for educational purposes.
