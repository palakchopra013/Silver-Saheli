"""
MongoDB Document Models
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Contact(BaseModel):
    """Contact document model"""
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    phone: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True

class Emergency(BaseModel):
    """Emergency document model"""
    id: Optional[str] = Field(alias="_id", default=None)
    user_name: str
    location: str
    timestamp: datetime = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True

class Trip(BaseModel):
    """Trip document model"""
    id: Optional[str] = Field(alias="_id", default=None)
    title: str
    date: str
    description: Optional[str] = None
    price: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True

class FamilyMember(BaseModel):
    """Family member document model"""
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    phone: str
    relationship: str
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True
