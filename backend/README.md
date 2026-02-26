# Litbooks Backend API

FastAPI-based REST API for the Litbooks book management platform. Features JWT authentication, role-based access control, and PostgreSQL database with async SQLAlchemy.

## Features

- **User Authentication:** JWT-based auth with registration, login, password reset
- **Role-Based Access:** User and admin roles with different permissions
- **Books Management:** Full CRUD operations for books (admin-only creation)
- **Tag System:** Automatic tag creation and management
- **Search & Filter:** Search books by title/author, filter by tags
- **Auto Admin Creation:** Automatically creates admin user on startup
- **Interactive API Docs:** Swagger UI and ReDoc available

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Async ORM for database operations
- **PostgreSQL** - Primary database (supports SQLite for dev)
- **Pydantic** - Data validation and settings management
- **JWT** - Token-based authentication
- **Passlib** - Password hashing with bcrypt
- **Python-JOSE** - JWT token creation and validation

## Quick Start

### 1. Install Dependencies

Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

Install required packages:

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/litbooks
SECRET_KEY=your-secret-key-here-generate-a-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123!
ADMIN_FULL_NAME=Admin User
```

**Important:** Change the `SECRET_KEY` to a secure random string. Generate one with:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Database Options:**

- PostgreSQL (recommended): `postgresql+asyncpg://user:pass@localhost/dbname`
- SQLite (development): `sqlite+aiosqlite:///./litbooks.db`

### 3. Run the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

On first run:

- Database tables are created automatically
- Admin user is created with credentials from `.env`

## API Documentation

Once running, access the interactive documentation:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

Use these interfaces to test all endpoints without writing code.

## Project Structure

```
backend/
├── app/
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py          # Authentication endpoints
│   │   └── books.py         # Books CRUD endpoints
│   ├── __init__.py
│   ├── auth.py              # Password hashing, JWT operations
│   ├── config.py            # Settings and environment variables
│   ├── database.py          # Database connection and session
│   ├── dependencies.py      # FastAPI dependencies (auth, roles)
│   ├── models.py            # SQLAlchemy database models
│   └── schemas.py           # Pydantic request/response schemas
├── main.py                  # FastAPI application and startup
├── requirements.txt         # Python dependencies
├── run.bat                  # Windows run script
└── run.sh                   # Unix run script
```

## Database Models

### User

- `id` - Primary key
- `full_name` - User's full name
- `email` - Unique email address (used for login)
- `hashed_password` - Bcrypt hashed password
- `role` - User role (user/admin)
- `created_at` - Account creation timestamp
- `reset_token` - Password reset token (nullable)
- `reset_token_expiry` - Reset token expiration (nullable)

### Book

- `id` - Primary key
- `title` - Book title
- `author` - Book author
- `description` - Book description (nullable)
- `image_url` - Cover image URL (nullable)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `creator_id` - Foreign key to User
- `tags` - Many-to-many relationship with Tag

### Tag

- `id` - Primary key
- `name` - Unique tag name (lowercase)
- `books` - Many-to-many relationship with Book

## API Endpoints

### Authentication (`/auth`)

#### POST `/auth/register`

Register a new user account.

**Request:**

```json
{
  "email": "user@example.com",
  "full_name": "John Doe",
  "password": "SecurePass123!"
}
```

**Response:** User object with id, email, full_name

#### POST `/auth/login`

Login with OAuth2 form (supports Swagger UI).

**Form Data:**

- `username` - User email
- `password` - User password

**Response:**

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

#### POST `/auth/login/json`

Login with JSON body (for frontend apps).

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** Same as `/auth/login`

#### GET `/auth/me`

Get current authenticated user info.

**Headers:** `Authorization: Bearer <token>`

**Response:** User object

#### POST `/auth/forgot-password`

Request a password reset token.

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:** Success message (token printed to console in dev)

#### POST `/auth/reset-password`

Reset password using token.

**Request:**

```json
{
  "token": "reset-token-from-email",
  "new_password": "NewSecure123!"
}
```

#### POST `/auth/change-password`

Change password (authenticated users).

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "old_password": "CurrentPass123!",
  "new_password": "NewSecure123!"
}
```

### Books (`/books`)

#### POST `/books/`

Create a new book (admin only).

**Headers:** `Authorization: Bearer <admin-token>`

**Request:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel",
  "image_url": "https://example.com/image.jpg",
  "tags": ["classic", "fiction"]
}
```

**Response:** Created book object with tags

#### GET `/books/`

List all books with optional search and filter.

**Query Parameters:**

- `skip` - Pagination offset (default: 0)
- `limit` - Max results (default: 100, max: 100)
- `search` - Search in title or author (case-insensitive)
- `tag` - Filter by tag name

**Example:** `/books/?search=gatsby&tag=classic&limit=20`

**Response:** Array of book objects

#### GET `/books/{id}`

Get a specific book by ID.

**Response:** Book object with tags and creator info

#### PUT `/books/{id}`

Update a book (creator only).

**Headers:** `Authorization: Bearer <token>`

**Request:** Partial book update (all fields optional)

```json
{
  "title": "Updated Title",
  "tags": ["new-tag"]
}
```

**Response:** Updated book object

#### DELETE `/books/{id}`

Delete a book (creator only).

**Headers:** `Authorization: Bearer <token>`

**Response:** Success message

#### GET `/books/tags/all`

Get all unique tags.

**Response:** Array of tag objects

## Password Requirements

All passwords must contain:

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one digit (0-9)
- At least one special character (!@#$%^&\*(),.?":{}|<>)

## Testing the API

### Using Swagger UI

1. Start the server: `uvicorn main:app --reload`
2. Open http://localhost:8000/docs
3. Click "Authorize" button
4. Login to get a token
5. Enter token in format: `Bearer <your-token>`
6. Test any endpoint

### Using cURL

**Register:**

```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","full_name":"Test User","password":"TestPass123!"}'
```

**Login:**

```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=TestPass123!"
```

**Create Book (Admin):**

```bash
TOKEN="your-admin-token"
curl -X POST "http://localhost:8000/books/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","description":"Dystopian novel","tags":["dystopian","classic"]}'
```

**Search Books:**

```bash
curl "http://localhost:8000/books/?search=orwell"
```

## Role-Based Access

- **User Role (default):**
  - Can view all books
  - Can search and filter books
  - Cannot create, edit, or delete books

- **Admin Role:**
  - All user permissions
  - Can create new books
  - Can edit books they created
  - Can delete books they created

## Development Notes

- Database tables are created automatically on startup
- Admin account auto-created from `.env` on first run
- CORS enabled for all origins (update `main.py` for production)
- Password reset tokens printed to console (configure SMTP for production)
- JWT tokens expire after 30 minutes (configurable in `.env`)

## Production Considerations

1. **Secret Key:** Use a strong, randomly generated secret key
2. **Database:** Use PostgreSQL instead of SQLite
3. **CORS:** Restrict allowed origins in `main.py`
4. **HTTPS:** Always use HTTPS in production
5. **Email:** Configure SMTP for password reset emails
6. **Environment:** Never commit `.env` file to version control
7. **Admin User:** Use strong admin credentials

## Dependencies

All dependencies are listed in `requirements.txt`:

- fastapi - Web framework
- uvicorn - ASGI server
- sqlalchemy - Database ORM
- pydantic & pydantic-settings - Data validation
- python-jose - JWT handling
- passlib & bcrypt - Password hashing
- python-multipart - Form data support
- email-validator - Email validation
- asyncpg - PostgreSQL async driver
- psycopg2-binary - PostgreSQL sync driver (backup)
- python-dotenv - Environment variable loading
