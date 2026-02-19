# Quick Start Guide

Get your Litbooks API running in 3 minutes!

## Prerequisites

- Python 3.8 or higher

## Quick Start (Windows)

```bash
cd backend
run.bat
```

## Quick Start (Mac/Linux)

```bash
cd backend
chmod +x run.sh
./run.sh
```

## Manual Setup

### 1. Navigate to backend

```bash
cd backend
```

### 2. Create virtual environment

```bash
python -m venv venv
```

### 3. Activate virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**Mac/Linux:**

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment

```bash
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux
```

### 6. Start the server

```bash
uvicorn main:app --reload
```

## Access the API

- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

## First Steps

### 1. Register a User

Visit http://localhost:8000/docs and use `POST /auth/register`:

```json
{
  "email": "yourname@example.com",
  "full_name": "Your Name",
  "password": "YourPass123!"
}
```

### 2. Login

Use `POST /auth/login` to get an access token.

### 3. Authorize

Click "Authorize" in the docs and paste your access token.

### 4. Create a Book

Use `POST /books/`:

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "description": "A fantasy adventure",
  "image_url": "https://example.com/hobbit.jpg",
  "tags": ["fantasy", "adventure"]
}
```

## Troubleshooting

**Port in use:** Change port with `uvicorn main:app --reload --port 8080`

**Module not found:** Activate venv and run `pip install -r requirements.txt`

**Database errors:** Delete `litbooks.db` and restart

For more details, see [backend/README.md](backend/README.md)

### 3. Authorize in Swagger

Click the "Authorize" button in the docs and paste your access token.

### 4. Create Your First Book

Use `POST /books/` to add a book:

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "description": "A fantasy adventure",
  "image_url": "https://example.com/hobbit.jpg",
  "tags": ["fantasy", "adventure"]
}
```

## Troubleshooting

### Port Already in Use

If port 8000 is busy, change the port:

```bash
uvicorn main:app --reload --port 8080
```

### Module Not Found

Make sure your virtual environment is activated and dependencies are installed:

```bash
pip install -r requirements.txt
```

### Database Errors

Delete `litbooks.db` and restart the server to recreate the database:

```bash
# Windows
del litbooks.db

# Mac/Linux
rm litbooks.db
```

## Next Steps

Check out the full [README.md](README.md) for:

- Complete API documentation
- All available endpoints
- Security best practices
- Production deployment tips

Happy coding! 📚✨
