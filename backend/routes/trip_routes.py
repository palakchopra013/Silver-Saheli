"""
Trip routes
"""

from fastapi import APIRouter, HTTPException, status
from database import get_db
from schemas import TripCreate
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_trip(trip: TripCreate):
    """Create a new trip"""
    try:
        db = get_db()
        trip_dict = trip.model_dump()
        trip_dict["created_at"] = datetime.now()
        
        result = await db["trips"].insert_one(trip_dict)
        
        return {
            "success": True,
            "message": "Trip created successfully",
            "id": str(result.inserted_id)
        }
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/all")
async def get_all_trips():
    """Get all trips"""
    try:
        db = get_db()
        trips = await db["trips"].find().to_list(None)
        
        for trip in trips:
            trip["_id"] = str(trip["_id"])
        
        return trips
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/{trip_id}")
async def get_trip(trip_id: str):
    """Get a specific trip"""
    try:
        db = get_db()
        trip = await db["trips"].find_one({"_id": ObjectId(trip_id)})
        
        if not trip:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Trip not found"
            )
        
        trip["_id"] = str(trip["_id"])
        return trip
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.delete("/{trip_id}")
async def delete_trip(trip_id: str):
    """Delete a trip"""
    try:
        db = get_db()
        result = await db["trips"].delete_one({"_id": ObjectId(trip_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Trip not found"
            )
        
        return {"success": True, "message": "Trip deleted successfully"}
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )
