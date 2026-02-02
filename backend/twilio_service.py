"""
Twilio integration for SMS/WhatsApp emergency alerts
"""

import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

# Check if Twilio is configured
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_WHATSAPP_NUMBER = os.getenv("TWILIO_WHATSAPP_NUMBER")

TWILIO_CONFIGURED = bool(TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN)

if TWILIO_CONFIGURED:
    from twilio.rest import Client
    twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
else:
    twilio_client = None

async def send_sms_alert(phone_number: str, user_name: str, location: str) -> bool:
    """
    Send SMS emergency alert
    
    Args:
        phone_number: Recipient phone number (with country code)
        user_name: Name of the person in emergency
        location: Location of emergency
    
    Returns:
        True if sent successfully, False otherwise
    """
    if not TWILIO_CONFIGURED:
        print("⚠️  Twilio not configured. SMS alerts disabled.")
        return False
    
    try:
        message_body = (
            f"🚨 EMERGENCY ALERT 🚨\n"
            f"Name: {user_name}\n"
            f"Location: {location}\n"
            f"Time: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            f"Please respond or contact authorities if needed."
        )
        
        message = twilio_client.messages.create(
            body=message_body,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        
        print(f"✅ SMS sent successfully. SID: {message.sid}")
        return True
    except Exception as error:
        print(f"❌ Failed to send SMS: {error}")
        return False

async def send_whatsapp_alert(phone_number: str, user_name: str, location: str) -> bool:
    """
    Send WhatsApp emergency alert
    
    Args:
        phone_number: Recipient WhatsApp number (with country code, e.g., +919876543210)
        user_name: Name of the person in emergency
        location: Location of emergency
    
    Returns:
        True if sent successfully, False otherwise
    """
    if not TWILIO_CONFIGURED:
        print("⚠️  Twilio not configured. WhatsApp alerts disabled.")
        return False
    
    try:
        message_body = (
            f"🚨 EMERGENCY ALERT 🚨\n"
            f"Name: {user_name}\n"
            f"Location: {location}\n"
            f"Time: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            f"Please respond or contact authorities if needed."
        )
        
        message = twilio_client.messages.create(
            body=message_body,
            from_=f"whatsapp:{TWILIO_WHATSAPP_NUMBER}",
            to=f"whatsapp:{phone_number}"
        )
        
        print(f"✅ WhatsApp message sent successfully. SID: {message.sid}")
        return True
    except Exception as error:
        print(f"❌ Failed to send WhatsApp message: {error}")
        return False

async def send_emergency_to_contacts(user_name: str, location: str, contacts: list) -> dict:
    """
    Send emergency alert to multiple contacts
    
    Args:
        user_name: Name of the person in emergency
        location: Location of emergency
        contacts: List of contact objects with 'phone' field
    
    Returns:
        Dict with success count and failed count
    """
    sms_sent = 0
    sms_failed = 0
    
    for contact in contacts:
        phone = contact.get("phone") or contact.get("phone_number")
        if phone:
            success = await send_sms_alert(phone, user_name, location)
            if success:
                sms_sent += 1
            else:
                sms_failed += 1
    
    return {
        "sms_sent": sms_sent,
        "sms_failed": sms_failed,
        "whatsapp_sent": 0
    }
