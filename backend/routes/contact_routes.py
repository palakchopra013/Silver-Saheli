"""
Contact routes
"""

from fastapi import APIRouter, HTTPException, status
from database import get_db
from models import Contact
from schemas import ContactCreate, ContactResponse
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/submit", response_model=dict, status_code=status.HTTP_201_CREATED)
async def submit_contact(contact: ContactCreate):
    """Submit a contact form"""
    try:
        db = get_db()
        contact_dict = contact.model_dump()
        contact_dict["created_at"] = datetime.now()
        
        result = await db["contacts"].insert_one(contact_dict)
        
        return {
            "success": True,
            "message": "Contact saved successfully",
            "id": str(result.inserted_id)
        }
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/all", response_model=list)
async def get_all_contacts():
    """Get all contacts"""
    try:
        db = get_db()
        contacts = await db["contacts"].find().to_list(None)
        
        # Convert ObjectId to string for JSON serialization
        for contact in contacts:
            contact["_id"] = str(contact["_id"])
        
        return contacts
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/{contact_id}", response_model=dict)
async def get_contact(contact_id: str):
    """Get a specific contact"""
    try:
        db = get_db()
        contact = await db["contacts"].find_one({"_id": ObjectId(contact_id)})
        
        if not contact:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact not found"
            )
        
        contact["_id"] = str(contact["_id"])
        return contact
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.delete("/{contact_id}")
async def delete_contact(contact_id: str):
    """Delete a contact"""
    try:
        db = get_db()
        result = await db["contacts"].delete_one({"_id": ObjectId(contact_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact not found"
            )
        
        return {"success": True, "message": "Contact deleted successfully"}
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )
