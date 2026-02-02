"""
Silver Saheli - FastAPI Backend
Main application entry point
"""

import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from routes import contact_routes, emergency_routes, trip_routes, family_routes, auth_routes
from database import init_db
from security_middleware import SecurityHeadersMiddleware, RequestLoggingMiddleware

# Load environment variables
load_dotenv()

# Initialize database on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    print("✅ Database initialized successfully")
    
    yield
    # Shutdown
    print("👋 Server shutting down")

# Create FastAPI app
app = FastAPI(
    title="Silver Saheli Backend",
    description="Women Safety App - Backend API",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS - restrict to specific domains in production
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173,http://localhost:8000,http://127.0.0.1:5050"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)

# Add security middleware
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    print("🟢 /api/health hit")
    return {
        "status": "Backend is running 🚀",
        "time": datetime.now().isoformat()
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Silver Saheli Backend is live 🌸"}

# Include routers
app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(contact_routes.router, prefix="/api/contacts", tags=["contacts"])
app.include_router(emergency_routes.router, prefix="/api/emergency", tags=["emergency"])
app.include_router(trip_routes.router, prefix="/api/trips", tags=["trips"])
app.include_router(family_routes.router, prefix="/api/family", tags=["family"])

if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 5050))
    uvicorn.run(app, host="0.0.0.0", port=PORT)
