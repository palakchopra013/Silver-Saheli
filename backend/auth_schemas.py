"""
Authentication schemas for login and user management
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserRegister(BaseModel):
    """Schema for user registration"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)
    phone: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Priya Sharma",
                "email": "priya@example.com",
                "password": "securepass123",
                "phone": "9876543210"
            }
        }

class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "priya@example.com",
                "password": "securepass123"
            }
        }

class TokenResponse(BaseModel):
    """Schema for token response"""
    access_token: str
    token_type: str = "bearer"
    user: dict

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "id": "123abc",
                    "name": "Priya Sharma",
                    "email": "priya@example.com"
                }
            }
        }

class UserResponse(BaseModel):
    """Schema for user response"""
    id: str = Field(alias="_id")
    name: str
    email: str
    phone: Optional[str]

    class Config:
        from_attributes = True
        populate_by_name = True
