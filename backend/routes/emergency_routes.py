"""
Emergency routes
"""

from fastapi import APIRouter, HTTPException, status
from database import get_db
from schemas import EmergencyCreate
from twilio_service import send_emergency_to_contacts, send_sms_alert
from datetime import datetime
from typing import Optional

router = APIRouter()

@router.post("/send")
async def send_emergency_alert(emergency: EmergencyCreate):
    """
    Send emergency SOS alert to family members
    Sends SMS and WhatsApp notifications to registered emergency contacts
    """
    try:
        db = get_db()
        
        # Save emergency alert to database
        emergency_dict = {
            "user_name": emergency.user_name,
            "location": emergency.location,
            "timestamp": datetime.now(),
            "status": "sent"
        }
        
        result = await db["emergencies"].insert_one(emergency_dict)
        
        # Get all family members for this user
        family_members = await db["family_members"].find({}).to_list(None)
        
        # Send alerts to family members
        alert_result = await send_emergency_to_contacts(
            emergency.user_name,
            emergency.location,
            family_members
        )
        
        return {
            "success": True,
            "message": f"Emergency alert sent! Notified {alert_result['sms_sent']} contacts via SMS",
            "alert_id": str(result.inserted_id),
            "notifications": alert_result
        }
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send emergency alert"
        )

@router.get("/history")
async def get_emergency_history():
    """Get all emergency alerts history"""
    try:
        db = get_db()
        emergencies = await db["emergencies"].find().sort("timestamp", -1).to_list(None)
        
        for emergency in emergencies:
            emergency["_id"] = str(emergency["_id"])
        
        return emergencies
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )

@router.get("/status/{alert_id}")
async def get_emergency_status(alert_id: str):
    """Get status of a specific emergency alert"""
    try:
        from bson import ObjectId
        db = get_db()
        
        emergency = await db["emergencies"].find_one({"_id": ObjectId(alert_id)})
        
        if not emergency:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Emergency alert not found"
            )
        
        emergency["_id"] = str(emergency["_id"])
        return emergency
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server error"
        )
