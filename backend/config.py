"""
Production configuration
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Environment settings
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Database
MONGODB_URL = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "silver_saheli")

# Security
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY and ENVIRONMENT == "production":
    raise ValueError("SECRET_KEY must be set in production")

# CORS
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173" if DEBUG else ""
).split(",")

# Twilio
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_WHATSAPP_NUMBER = os.getenv("TWILIO_WHATSAPP_NUMBER")

# Redis (for caching/rate limiting)
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO" if ENVIRONMENT == "production" else "DEBUG")

# Assertions for production
if ENVIRONMENT == "production":
    assert MONGODB_URL, "MONGO_URI must be configured in production"
    assert SECRET_KEY, "SECRET_KEY must be configured in production"
    assert len(ALLOWED_ORIGINS) > 0, "ALLOWED_ORIGINS must be configured in production"
