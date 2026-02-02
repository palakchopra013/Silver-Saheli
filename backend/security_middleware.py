"""
Security middleware and utilities
"""

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from datetime import datetime
import html
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Add security headers to all responses"""
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Security headers
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        return response

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Log all incoming requests"""
    
    async def dispatch(self, request: Request, call_next):
        # Log request
        logger.info(
            f"{request.method} {request.url.path} | "
            f"Client: {request.client.host if request.client else 'unknown'}"
        )
        
        response = await call_next(request)
        
        # Log response status
        logger.info(f"Response: {response.status_code}")
        
        return response

def sanitize_input(text: str) -> str:
    """
    Sanitize user input to prevent XSS attacks
    
    Args:
        text: User input text
    
    Returns:
        Sanitized text with HTML entities escaped
    """
    if not isinstance(text, str):
        return text
    
    # Escape HTML special characters
    sanitized = html.escape(text)
    
    # Remove potentially harmful patterns
    harmful_patterns = [
        "script>",
        "iframe>",
        "onclick=",
        "onerror=",
        "onload=",
        "javascript:",
    ]
    
    for pattern in harmful_patterns:
        sanitized = sanitized.replace(pattern, "")
    
    return sanitized

def validate_input_length(text: str, max_length: int = 1000) -> bool:
    """
    Validate input length to prevent buffer overflow attacks
    
    Args:
        text: User input text
        max_length: Maximum allowed length
    
    Returns:
        True if valid, False otherwise
    """
    return len(text) <= max_length

def is_valid_email(email: str) -> bool:
    """
    Validate email format
    
    Args:
        email: Email string
    
    Returns:
        True if valid email format, False otherwise
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def is_valid_phone(phone: str) -> bool:
    """
    Validate phone number format
    
    Args:
        phone: Phone number string
    
    Returns:
        True if valid phone format, False otherwise
    """
    import re
    pattern = r'^[+]?[0-9]{10,15}$'
    return bool(re.match(pattern, phone))
