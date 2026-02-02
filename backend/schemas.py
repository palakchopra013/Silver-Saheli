"""
Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime
from bson import ObjectId
import re

class ContactCreate(BaseModel):
    """Schema for creating a contact"""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    message: Optional[str] = Field(None, max_length=1000)

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        """Validate phone number format"""
        if not re.match(r'^[+]?[0-9]{10,15}$', v):
            raise ValueError('Invalid phone number format')
        return v

    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        """Validate name doesn't contain special characters"""
        if not re.match(r'^[a-zA-Z\s]+$', v):
            raise ValueError('Name can only contain letters and spaces')
        return v.strip()

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Priya",
                "phone": "9876543210",
                "message": "Please call me for safety updates"
            }
        }

class ContactResponse(BaseModel):
    """Schema for contact response"""
    id: str = Field(alias="_id")
    name: str
    phone: str
    message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class EmergencyCreate(BaseModel):
    """Schema for emergency alert"""
    user_name: str = Field(..., min_length=2, max_length=100)
    location: str = Field(..., min_length=5, max_length=200)

    @field_validator('user_name')
    @classmethod
    def validate_user_name(cls, v):
        """Validate user name"""
        if not re.match(r'^[a-zA-Z\s]+$', v):
            raise ValueError('Name can only contain letters and spaces')
        return v.strip()

    @field_validator('location')
    @classmethod
    def validate_location(cls, v):
        """Validate location format"""
        if len(v.split()) < 2:
            raise ValueError('Location must include city and state/country')
        return v.strip()

    class Config:
        json_schema_extra = {
            "example": {
                "user_name": "Priya",
                "location": "Delhi, India"
            }
        }

class TripCreate(BaseModel):
    """Schema for creating a trip"""
    title: str = Field(..., min_length=3, max_length=100)
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    description: Optional[str] = Field(None, max_length=500)
    price: Optional[float] = Field(None, ge=0, le=1000000)

    @field_validator('date')
    @classmethod
    def validate_date(cls, v):
        """Validate date format"""
        try:
            datetime.strptime(v, '%Y-%m-%d')
        except ValueError:
            raise ValueError('Date must be in YYYY-MM-DD format')
        return v

    @field_validator('title')
    @classmethod
    def validate_title(cls, v):
        """Validate title"""
        return v.strip()

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Goa Beach Trip",
                "date": "2026-03-15",
                "description": "5-day beach vacation",
                "price": 25000
            }
        }

class TripResponse(BaseModel):
    """Schema for trip response"""
    id: str = Field(alias="_id")
    title: str
    date: str
    description: Optional[str]
    price: Optional[float]

    class Config:
        from_attributes = True

class FamilyMemberCreate(BaseModel):
    """Schema for adding family member"""
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    relationship: str = Field(..., min_length=2, max_length=50)

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v):
        """Validate phone number format"""
        if not re.match(r'^[+]?[0-9]{10,15}$', v):
            raise ValueError('Invalid phone number format')
        return v

    @field_validator('name')
    @classmethod
    def validate_name(cls, v):
        """Validate name"""
        if not re.match(r'^[a-zA-Z\s]+$', v):
            raise ValueError('Name can only contain letters and spaces')
        return v.strip()

    @field_validator('relationship')
    @classmethod
    def validate_relationship(cls, v):
        """Validate relationship"""
        valid_relationships = [
            'Mother', 'Father', 'Sister', 'Brother', 
            'Grandmother', 'Grandfather', 'Aunt', 'Uncle',
            'Cousin', 'Friend', 'Colleague', 'Other'
        ]
        if v not in valid_relationships:
            raise ValueError(f'Relationship must be one of: {", ".join(valid_relationships)}')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Mother",
                "phone": "9876543210",
                "relationship": "Mother"
            }
        }

class FamilyMemberResponse(BaseModel):
    """Schema for family member response"""
    id: str = Field(alias="_id")
    name: str
    phone: str
    relationship: str

    class Config:
        from_attributes = True
