#!/bin/bash

echo "Starting Litbooks API Server..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating one..."
    python3 -m venv venv
    echo ""
fi

# Activate virtual environment
source venv/bin/activate

# Check if dependencies are installed
python -c "import fastapi" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ".env file not found. Copying from .env.example..."
    cp .env.example .env
    echo ""
    echo "WARNING: Please update SECRET_KEY in .env file before using in production!"
    echo ""
fi

# Start the server
echo "Starting server at http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo ""
uvicorn main:app --reload --host 0.0.0.0 --port 8000
