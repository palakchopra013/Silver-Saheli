# Silver Saheli - FastAPI Backend Documentation

## 📋 Table of Contents
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Deployment](#deployment)

## 🚀 API Overview

**Base URL**: `http://localhost:5050/api` (Development)

**Production**: Configure in environment variables

**API Documentation**: 
- Swagger UI: `http://localhost:5050/docs`
- ReDoc: `http://localhost:5050/redoc`

## 🔐 Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Register User
**POST** `/auth/register`

```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "securepass123",
  "phone": "+919876543210"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "id": "507f1f77bcf86cd799439011"
}
```

### Login User
**POST** `/auth/login`

```json
{
  "email": "priya@example.com",
  "password": "securepass123"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Priya Sharma",
    "email": "priya@example.com"
  }
}
```

### Get Current User
**GET** `/auth/me`

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response** (200):
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "+919876543210"
}
```

## 📞 Contacts API

### Submit Contact Form
**POST** `/contacts/submit`

```json
{
  "name": "John Doe",
  "phone": "+919876543210",
  "message": "Please reach out"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Contact saved successfully",
  "id": "507f1f77bcf86cd799439012"
}
```

### Get All Contacts
**GET** `/contacts/all`

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "phone": "+919876543210",
    "message": "Please reach out",
    "created_at": "2026-02-02T10:30:00"
  }
]
```

### Get Contact by ID
**GET** `/contacts/{contact_id}`

### Delete Contact
**DELETE** `/contacts/{contact_id}`

**Response** (200):
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## 🚨 Emergency SOS API

### Send Emergency Alert
**POST** `/emergency/send`

Sends alert to all registered family members via SMS/WhatsApp

```json
{
  "user_name": "Priya",
  "location": "Delhi, India"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Emergency alert sent! Notified 3 contacts via SMS",
  "alert_id": "507f1f77bcf86cd799439013",
  "notifications": {
    "sms_sent": 3,
    "sms_failed": 0,
    "whatsapp_sent": 0
  }
}
```

### Get Emergency History
**GET** `/emergency/history`

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "user_name": "Priya",
    "location": "Delhi, India",
    "timestamp": "2026-02-02T10:30:00",
    "status": "sent"
  }
]
```

### Get Emergency Alert Status
**GET** `/emergency/status/{alert_id}`

## 🛫 Trips API

### Create Trip
**POST** `/trips/create`

```json
{
  "title": "Goa Beach Trip",
  "date": "2026-03-15",
  "description": "5-day beach vacation",
  "price": 25000
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Trip created successfully",
  "id": "507f1f77bcf86cd799439014"
}
```

### Get All Trips
**GET** `/trips/all`

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Goa Beach Trip",
    "date": "2026-03-15",
    "description": "5-day beach vacation",
    "price": 25000
  }
]
```

### Delete Trip
**DELETE** `/trips/{trip_id}`

## 👨‍👩‍👧‍👦 Family Members API

### Add Family Member
**POST** `/family/add`

Valid relationships: Mother, Father, Sister, Brother, Grandmother, Grandfather, Aunt, Uncle, Cousin, Friend, Colleague, Other

```json
{
  "name": "Mother",
  "phone": "+919876543211",
  "relationship": "Mother"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Family member added successfully",
  "id": "507f1f77bcf86cd799439015"
}
```

### Get All Family Members
**GET** `/family/all`

**Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "name": "Mother",
    "phone": "+919876543211",
    "relationship": "Mother"
  }
]
```

### Delete Family Member
**DELETE** `/family/{member_id}`

## ❌ Error Handling

### Standard Error Response
```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- **200**: Success
- **201**: Created (successful POST)
- **400**: Bad Request (invalid input)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found (resource doesn't exist)
- **422**: Unprocessable Entity (validation error)
- **500**: Server Error

### Example Error Response (422)
```json
{
  "detail": [
    {
      "loc": ["body", "phone"],
      "msg": "Invalid phone number format",
      "type": "value_error"
    }
  ]
}
```

## 💻 Code Examples

### JavaScript/Fetch API

```javascript
// Register user
const registerUser = async () => {
  const response = await fetch('http://localhost:5050/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Priya',
      email: 'priya@example.com',
      password: 'password123',
      phone: '9876543210'
    })
  });
  return response.json();
};

// Login
const loginUser = async () => {
  const response = await fetch('http://localhost:5050/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'priya@example.com',
      password: 'password123'
    })
  });
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

// Send emergency alert
const sendEmergency = async (token) => {
  const response = await fetch('http://localhost:5050/api/emergency/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      user_name: 'Priya',
      location: 'Delhi, India'
    })
  });
  return response.json();
};

// Submit contact form
const submitContact = async () => {
  const response = await fetch('http://localhost:5050/api/contacts/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'John Doe',
      phone: '9876543210',
      message: 'Test message'
    })
  });
  return response.json();
};
```

### Python/Requests

```python
import requests

BASE_URL = 'http://localhost:5050/api'

# Register
response = requests.post(f'{BASE_URL}/auth/register', json={
    'name': 'Priya',
    'email': 'priya@example.com',
    'password': 'password123',
    'phone': '9876543210'
})
print(response.json())

# Login
response = requests.post(f'{BASE_URL}/auth/login', json={
    'email': 'priya@example.com',
    'password': 'password123'
})
token = response.json()['access_token']

# Send emergency
response = requests.post(
    f'{BASE_URL}/emergency/send',
    headers={'Authorization': f'Bearer {token}'},
    json={
        'user_name': 'Priya',
        'location': 'Delhi, India'
    }
)
print(response.json())
```

## 🐳 Deployment

### Docker
```bash
# Build image
docker build -t silver-saheli-backend .

# Run container
docker run -p 5050:5050 \
  -e MONGO_URI=mongodb://mongo:27017 \
  -e SECRET_KEY=your-secret-key \
  silver-saheli-backend
```

### Docker Compose
```bash
docker-compose up --build
```

### Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create silver-saheli-backend

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set MONGO_URI=your-mongodb-uri

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### AWS Elastic Beanstalk
```bash
eb init
eb create silver-saheli-prod
eb deploy
```

## ✅ Running Tests

```bash
# Run all tests
pytest tests.py -v

# Run specific test class
pytest tests.py::TestAuthenticationRoutes -v

# Run with coverage
pytest tests.py --cov=. --cov-report=html
```

## 🔧 Environment Variables

Create `.env` file in backend directory:

```env
# Server
PORT=5050
ENVIRONMENT=development

# Database
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=silver_saheli

# Security
SECRET_KEY=your-super-secret-key-change-in-production

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Twilio (Optional)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+1234567890

# Redis (Optional)
REDIS_URL=redis://localhost:6379
```

## 📞 Support

For issues or questions:
1. Check API documentation at `/docs`
2. Review error messages
3. Check application logs
4. Contact development team

---

**Last Updated**: February 2, 2026
**Version**: 1.0.0
