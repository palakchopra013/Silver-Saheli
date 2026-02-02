"""
Database configuration and setup
MongoDB with Motor (async driver)
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from dotenv import load_dotenv

load_dotenv()

# Get database URL
MONGODB_URL = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = "silver_saheli"

# Create async MongoDB client
client: AsyncIOMotorClient = None
db: AsyncIOMotorDatabase = None

async def init_db():
    """Initialize database connection"""
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    print(f"✅ Connected to MongoDB: {DATABASE_NAME}")
    
    # Create indexes for better performance
    try:
        from db_optimization import create_indexes
        await create_indexes()
    except Exception as e:
        print(f"⚠️  Could not create indexes: {e}")

async def close_db():
    """Close database connection"""
    global client
    if client:
        client.close()
        print("👋 MongoDB connection closed")

def get_db() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return db
