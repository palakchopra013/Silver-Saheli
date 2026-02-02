#!/bin/bash
# Quick Start Guide for Silver Saheli Backend
# Run this script to set up the development environment

set -e

echo "🚀 Silver Saheli Backend - Quick Setup"
echo "======================================"

# Check Python version
python3 --version

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "🔄 Upgrading pip..."
pip install --upgrade pip -q

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt -q

# Check if MongoDB is running
echo "🔍 Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB not running. Starting MongoDB..."
    brew services start mongodb-community
    sleep 2
fi

# Create indexes
echo "🗂️  Creating database indexes..."
python3 -c "
import asyncio
from database import init_db
from db_optimization import create_indexes

async def setup():
    await init_db()
    await create_indexes()

asyncio.run(setup())
"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Environment file: .env"
echo "📚 API Documentation: API_DOCUMENTATION.md"
echo "🧪 Run tests: pytest tests.py -v"
echo ""
echo "🚀 Start development server with:"
echo "   uvicorn main:app --reload --port 5050"
echo ""
echo "📖 API Docs will be available at:"
echo "   Swagger UI: http://localhost:5050/docs"
echo "   ReDoc: http://localhost:5050/redoc"
echo ""
