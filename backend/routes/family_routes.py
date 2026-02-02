"""
Family member routes
"""

from fastapi import APIRouter, HTTPException, status
from database import get_db
from schemas import FamilyMemberCreate
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/add", status_code=status.HTTP_201_CREATED)
async def add_family_member(member: FamilyMemberCreate):
    """Add a family member"""
    try:
        db = get_db()
        member_dict = member.model_dump()
        member_dict["created_at"] = datetime.now()
        
        result = await db["family_members"].insert_one(member_dict)
        
        return {
            "success": True,
            "message": "Family member added successfully",
            "id": str(result.inserted_id)
        }
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/all")
async def get_family_members():
    """Get all family members"""
    try:
        db = get_db()
        members = await db["family_members"].find().to_list(None)
        
        for member in members:
            member["_id"] = str(member["_id"])
        
        return members
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.delete("/{member_id}")
async def delete_family_member(member_id: str):
    """Delete a family member"""
    try:
        db = get_db()
        result = await db["family_members"].delete_one({"_id": ObjectId(member_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Family member not found"
            )
        
        return {"success": True, "message": "Family member deleted successfully"}
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )
