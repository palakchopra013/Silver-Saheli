"""
Authentication routes for user signup, login, and verification
"""

from fastapi import APIRouter, HTTPException, status, Depends, Header
from database import get_db
from security import hash_password, verify_password, create_access_token, decode_token
from auth_schemas import UserRegister, UserLogin, TokenResponse, UserResponse
from datetime import datetime
from bson import ObjectId
from typing import Optional

router = APIRouter()

@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
async def register(user: UserRegister):
    """Register a new user"""
    try:
        db = get_db()
        
        # Check if user already exists
        existing_user = await db["users"].find_one({"email": user.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password
        hashed_password = hash_password(user.password)
        
        # Create user document
        user_dict = {
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "phone": user.phone,
            "created_at": datetime.now()
        }
        
        result = await db["users"].insert_one(user_dict)
        
        return {
            "success": True,
            "message": "User registered successfully",
            "id": str(result.inserted_id)
        }
    except HTTPException:
        raise
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Login user and return JWT token"""
    try:
        db = get_db()
        
        # Find user
        user = await db["users"].find_one({"email": credentials.email})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Verify password
        if not verify_password(credentials.password, user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Create token
        token = create_access_token(
            data={"sub": str(user["_id"]), "email": user["email"]}
        )
        
        return TokenResponse(
            access_token=token,
            user={
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"]
            }
        )
    except HTTPException:
        raise
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user(authorization: Optional[str] = Header(None)):
    """Get current authenticated user"""
    try:
        if not authorization:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated"
            )
        
        # Extract token from "Bearer <token>"
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authorization header"
            )
        
        token = parts[1]
        payload = decode_token(token)
        
        if not payload:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
        
        db = get_db()
        user = await db["users"].find_one({"_id": ObjectId(payload["sub"])})
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user["_id"] = str(user["_id"])
        return user
    except HTTPException:
        raise
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.post("/logout")
async def logout():
    """Logout user (token invalidation handled on frontend)"""
    return {
        "success": True,
        "message": "Logged out successfully"
    }
