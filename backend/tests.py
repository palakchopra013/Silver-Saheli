"""
Unit and integration tests for Silver Saheli API
Run with: pytest tests.py -v
"""

import pytest
from fastapi.testclient import TestClient
from main import app
import json

# Create test client
client = TestClient(app)

class TestHealthAndRoot:
    """Test health check and root endpoints"""
    
    def test_health_check(self):
        """Test /api/health endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        assert "status" in response.json()
        assert "Backend is running" in response.json()["status"]
    
    def test_root_endpoint(self):
        """Test root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        assert "Silver Saheli Backend is live" in response.json()["message"]

class TestAuthenticationRoutes:
    """Test user authentication"""
    
    def test_register_user(self):
        """Test user registration"""
        user_data = {
            "name": "Test User",
            "email": "testuser@example.com",
            "password": "password123",
            "phone": "9876543210"
        }
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 201
        assert response.json()["success"] == True
        assert "id" in response.json()
    
    def test_register_duplicate_email(self):
        """Test registration with duplicate email"""
        user_data = {
            "name": "Test User",
            "email": "duplicate@example.com",
            "password": "password123",
            "phone": "9876543210"
        }
        # First registration
        client.post("/api/auth/register", json=user_data)
        
        # Duplicate registration
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"].lower()
    
    def test_register_invalid_email(self):
        """Test registration with invalid email"""
        user_data = {
            "name": "Test User",
            "email": "invalid-email",
            "password": "password123"
        }
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 422
    
    def test_register_short_password(self):
        """Test registration with short password"""
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "password": "short"
        }
        response = client.post("/api/auth/register", json=user_data)
        assert response.status_code == 422
    
    def test_login_user(self):
        """Test user login"""
        # Register user first
        user_data = {
            "name": "Login Test User",
            "email": "logintest@example.com",
            "password": "password123",
            "phone": "9876543210"
        }
        client.post("/api/auth/register", json=user_data)
        
        # Login
        login_data = {
            "email": "logintest@example.com",
            "password": "password123"
        }
        response = client.post("/api/auth/login", json=login_data)
        assert response.status_code == 200
        assert "access_token" in response.json()
        assert "user" in response.json()
    
    def test_login_invalid_password(self):
        """Test login with invalid password"""
        login_data = {
            "email": "logintest@example.com",
            "password": "wrongpassword"
        }
        response = client.post("/api/auth/login", json=login_data)
        assert response.status_code == 401

class TestContactRoutes:
    """Test contact form endpoints"""
    
    def test_submit_contact(self):
        """Test submitting contact form"""
        contact_data = {
            "name": "John Doe",
            "phone": "9876543210",
            "message": "Test message"
        }
        response = client.post("/api/contacts/submit", json=contact_data)
        assert response.status_code == 201
        assert response.json()["success"] == True
    
    def test_submit_contact_invalid_phone(self):
        """Test submitting contact with invalid phone"""
        contact_data = {
            "name": "John Doe",
            "phone": "123",  # Too short
            "message": "Test message"
        }
        response = client.post("/api/contacts/submit", json=contact_data)
        assert response.status_code == 422
    
    def test_submit_contact_invalid_name(self):
        """Test submitting contact with invalid name"""
        contact_data = {
            "name": "John123",  # Numbers not allowed
            "phone": "9876543210",
            "message": "Test message"
        }
        response = client.post("/api/contacts/submit", json=contact_data)
        assert response.status_code == 422
    
    def test_get_all_contacts(self):
        """Test getting all contacts"""
        response = client.get("/api/contacts/all")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

class TestEmergencyRoutes:
    """Test emergency SOS endpoints"""
    
    def test_send_emergency_alert(self):
        """Test sending emergency alert"""
        emergency_data = {
            "user_name": "Priya",
            "location": "Delhi, India"
        }
        response = client.post("/api/emergency/send", json=emergency_data)
        assert response.status_code == 200
        assert response.json()["success"] == True
    
    def test_emergency_alert_invalid_location(self):
        """Test emergency alert with invalid location"""
        emergency_data = {
            "user_name": "Priya",
            "location": "Delhi"  # Too short, needs city and state/country
        }
        response = client.post("/api/emergency/send", json=emergency_data)
        assert response.status_code == 422
    
    def test_get_emergency_history(self):
        """Test getting emergency history"""
        response = client.get("/api/emergency/history")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

class TestTripRoutes:
    """Test trip management endpoints"""
    
    def test_create_trip(self):
        """Test creating a trip"""
        trip_data = {
            "title": "Goa Beach Trip",
            "date": "2026-03-15",
            "description": "5-day beach vacation",
            "price": 25000
        }
        response = client.post("/api/trips/create", json=trip_data)
        assert response.status_code == 201
        assert response.json()["success"] == True
    
    def test_create_trip_invalid_date(self):
        """Test creating trip with invalid date format"""
        trip_data = {
            "title": "Goa Beach Trip",
            "date": "15-03-2026",  # Wrong format
            "description": "5-day beach vacation",
            "price": 25000
        }
        response = client.post("/api/trips/create", json=trip_data)
        assert response.status_code == 422
    
    def test_get_all_trips(self):
        """Test getting all trips"""
        response = client.get("/api/trips/all")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

class TestFamilyRoutes:
    """Test family member endpoints"""
    
    def test_add_family_member(self):
        """Test adding a family member"""
        member_data = {
            "name": "Mother",
            "phone": "9876543211",
            "relationship": "Mother"
        }
        response = client.post("/api/family/add", json=member_data)
        assert response.status_code == 201
        assert response.json()["success"] == True
    
    def test_add_family_member_invalid_relationship(self):
        """Test adding family member with invalid relationship"""
        member_data = {
            "name": "Mother",
            "phone": "9876543211",
            "relationship": "InvalidRelationship"
        }
        response = client.post("/api/family/add", json=member_data)
        assert response.status_code == 422
    
    def test_get_family_members(self):
        """Test getting all family members"""
        response = client.get("/api/family/all")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

class TestSecurityHeaders:
    """Test security headers"""
    
    def test_security_headers_present(self):
        """Test that security headers are present"""
        response = client.get("/api/health")
        
        assert "X-Content-Type-Options" in response.headers
        assert response.headers["X-Content-Type-Options"] == "nosniff"
        
        assert "X-Frame-Options" in response.headers
        assert response.headers["X-Frame-Options"] == "DENY"

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
