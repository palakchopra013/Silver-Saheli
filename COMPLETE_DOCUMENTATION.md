# 🛡️ Silver Saheli - Women Safety App - Complete Documentation

## 📌 Table of Contents
1. [Project Overview](#project-overview)
2. [What It Does](#what-it-does)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [API Endpoints](#api-endpoints)
8. [Features Implemented](#features-implemented)
9. [Setup & Installation](#setup--installation)
10. [Running the Project](#running-the-project)
11. [Deployment](#deployment)
12. [Database Schema](#database-schema)

---

## 🎯 Project Overview

**Silver Saheli** is a comprehensive women safety application that empowers women with tools to stay safe, connected, and secure. It combines real-time emergency alerts, family coordination, trip planning, and personal safety features in an integrated platform.

**Mission**: To provide women with a reliable safety network and emergency response system.

**Key Users**: Women, families, emergency contacts, and safety advocates.

---

## 🚀 What It Does

### Core Features

#### 1. **Emergency SOS System** 🚨
- One-click emergency alert to registered family members
- SMS and WhatsApp notifications via Twilio
- Real-time location sharing capability
- Emergency history and status tracking
- Automatic contact notification system

#### 2. **Family Member Management** 👨‍👩‍👧‍👦
- Add trusted family members and emergency contacts
- Manage relationship types (parent, sibling, friend, etc.)
- Store contact information (phone, email)
- Quick access to emergency contacts
- Family member profiles and relationships

#### 3. **Trip Planning & Sharing** ✈️
- Create and schedule trips with detailed information
- Share itinerary with family members
- Destination and timeline tracking
- Trip status updates
- Travel history records

#### 4. **Contact Management** 📇
- Submit and manage contact forms
- Store important contact information
- Query and update contacts
- Contact history and logs

#### 5. **User Authentication & Profiles** 🔐
- Secure user registration and login
- JWT-based authentication
- User profile management
- Password security with bcrypt hashing
- Session management

#### 6. **Safety & Security** 🛡️
- End-to-end encrypted communication
- CORS protection
- XSS prevention
- Security headers (HSTS, CSP, etc.)
- Input validation and sanitization
- Rate limiting (optional Redis-based)

---

## 🏗️ Tech Stack

### **Frontend**
| Layer | Technology |
|-------|-----------|
| **UI Framework** | React.js 18.x |
| **Build Tool** | Create React App / Webpack |
| **Styling** | CSS3, Bootstrap (optional) |
| **HTTP Client** | Fetch API / Axios |
| **State Management** | React Context API |
| **Routing** | React Router |
| **Authentication** | JWT Token Storage |

### **Backend**
| Layer | Technology |
|-------|-----------|
| **Framework** | FastAPI 0.104.1 |
| **Server** | Uvicorn (dev), Gunicorn (prod) |
| **Language** | Python 3.9+ |
| **Database** | MongoDB 5.0+ |
| **Database Driver** | Motor (async MongoDB) |
| **Validation** | Pydantic 2.5.0 |
| **Authentication** | PyJWT 2.11.0, Passlib[bcrypt] |
| **API Docs** | Swagger/OpenAPI, ReDoc |

### **External Services**
| Service | Purpose |
|---------|---------|
| **Twilio** | SMS & WhatsApp alerts |
| **MongoDB Atlas** | Cloud database (optional) |
| **Redis** | Rate limiting & caching |

### **Deployment**
| Environment | Tools |
|------------|-------|
| **Containerization** | Docker, Docker Compose |
| **Cloud Platforms** | Heroku, AWS EC2, Google Cloud |
| **CI/CD** | GitHub Actions (optional) |
| **Reverse Proxy** | Nginx |

---

## 📁 Project Structure

```
Silver Saheli/
├── backend/                      # FastAPI Backend
│   ├── main.py                  # FastAPI app entry point
│   ├── database.py              # MongoDB connection & init
│   ├── models.py                # Pydantic document models
│   ├── schemas.py               # Request/response schemas
│   ├── security.py              # JWT & password utilities
│   ├── auth_schemas.py          # Auth request schemas
│   ├── security_middleware.py   # Security headers & logging
│   ├── twilio_service.py        # SMS/WhatsApp integration
│   ├── db_optimization.py       # Database indexes
│   ├── config.py                # Production configuration
│   ├── tests.py                 # 25+ pytest test suite
│   │
│   ├── routes/                  # API endpoint modules
│   │   ├── __init__.py
│   │   ├── auth_routes.py       # Authentication endpoints
│   │   ├── contact_routes.py    # Contact form endpoints
│   │   ├── emergency_routes.py  # Emergency SOS endpoints
│   │   ├── trip_routes.py       # Trip planning endpoints
│   │   └── family_routes.py     # Family member endpoints
│   │
│   ├── requirements.txt         # Python dependencies
│   ├── Dockerfile              # Docker configuration
│   ├── docker-compose.yml      # Multi-container setup
│   ├── Procfile                # Heroku deployment
│   ├── .env.example            # Environment variables template
│   └── API_DOCUMENTATION.md    # Detailed API docs
│
├── frontend/                    # HTML/CSS Frontend
│   ├── index.html              # Home page
│   ├── emergency.html          # Emergency SOS page
│   ├── family.html             # Family management page
│   ├── trips.html              # Trip planning page
│   ├── contact.html            # Contact form page
│   ├── about.html              # About page
│   │
│   ├── css/
│   │   ├── style.css           # Global styles
│   │   ├── emergency.css
│   │   ├── family.css
│   │   ├── trips.css
│   │   ├── contact.css
│   │   └── about.css
│   │
│   └── js/
│       ├── main.js             # Global scripts
│       ├── services/
│       │   ├── api.js          # API integration
│       │   ├── auth.js         # Auth logic
│       │   ├── location.js     # Location services
│       │   └── reminders.js    # Reminder system
│       ├── ui/
│       │   ├── navbar.js       # Navigation bar
│       │   └── theme.js        # Theme switcher
│       ├── utils/
│       │   ├── helpers.js      # Utility functions
│       │   └── validate.js     # Form validation
│       └── pages/
│           ├── index.js        # Home page logic
│           ├── emergency.js    # Emergency page logic
│           ├── family.js       # Family page logic
│           ├── trips.js        # Trips page logic
│           └── contact.js      # Contact page logic
│
├── react_app/                  # React Frontend
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # React entry point
│   │   ├── App.css            # App styles
│   │   │
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── contactform.js
│   │   │   ├── emergencycard.js
│   │   │   ├── tripcard.js
│   │   │   └── FamilyMemberCard.js
│   │   │
│   │   ├── pages/            # Page components
│   │   │   ├── Home.js
│   │   │   ├── Contact.js
│   │   │   ├── Emergency.js
│   │   │   ├── Family.js
│   │   │   └── Trips.js
│   │   │
│   │   ├── utils/            # Utilities
│   │   │   ├── api.js        # API integration
│   │   │   └── constants.js  # App constants
│   │   │
│   │   ├── context/          # State management
│   │   │   └── usercontext.js
│   │   │
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useLocationTracking.js
│   │   │
│   │   └── assets/           # Images, icons
│   │       └── images/
│   │
│   ├── package.json
│   └── Dockerfile
│
├── README.md                   # Project overview
├── COMPLETE_DOCUMENTATION.md  # This file
└── .gitignore
```

---

## 🎨 Frontend Architecture

### HTML/CSS Frontend
A lightweight, responsive single-page application with vanilla JavaScript.

**Pages:**
- **Home (index.html)**: Landing page with app introduction
- **Emergency (emergency.html)**: One-click SOS button and emergency history
- **Family (family.html)**: Add/manage family members
- **Trips (trips.html)**: Plan and track trips
- **Contact (contact.html)**: Contact form
- **About (about.html)**: App information

**Features:**
- Responsive mobile-first design
- Dark/Light theme support
- Offline capability (progressive web app ready)
- Form validation before submission
- Real-time status updates

### React Frontend
Modern React application with component-based architecture.

**Components:**
```
Navbar (Navigation)
Footer (Footer)
├─ Home.js (Landing page)
├─ Emergency.js (SOS System)
│  └─ EmergencyCard.js
├─ Family.js (Family Management)
│  └─ FamilyMemberCard.js
├─ Trips.js (Trip Planning)
│  └─ TripCard.js
└─ Contact.js (Contact Form)
   └─ ContactForm.js
```

**State Management:**
- React Context API for user authentication
- Local component state for forms
- Custom hooks for location tracking and authentication

**API Integration:**
```javascript
// Example API calls
const api = {
  auth: {
    register(data),
    login(data),
    getCurrentUser(),
    logout()
  },
  contacts: {
    submit(data),
    getAll(),
    delete(id)
  },
  emergency: {
    sendAlert(data),
    getHistory(),
    getStatus(id)
  },
  trips: {
    create(data),
    getAll(),
    delete(id)
  },
  family: {
    addMember(data),
    getMembers(),
    deleteMember(id)
  }
};
```

---

## 🔧 Backend Architecture

### FastAPI Application Structure

#### **Lifespan Management** (`main.py`)
```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database and create indexes
    await init_db()
    yield
    # Shutdown: Cleanup resources
```

#### **Middleware Stack**
1. **CORS Middleware** - Cross-origin requests
2. **SecurityHeadersMiddleware** - Security headers (HSTS, CSP, etc.)
3. **RequestLoggingMiddleware** - Request logging and monitoring

#### **Route Modules** (`routes/`)

**Auth Routes** (`auth_routes.py`)
```
POST   /api/auth/register    - User registration
POST   /api/auth/login       - User login
GET    /api/auth/me          - Get current user
POST   /api/auth/logout      - User logout
```

**Contact Routes** (`contact_routes.py`)
```
POST   /api/contacts         - Submit contact form
GET    /api/contacts         - Get all contacts
GET    /api/contacts/{id}    - Get specific contact
DELETE /api/contacts/{id}    - Delete contact
```

**Emergency Routes** (`emergency_routes.py`)
```
POST   /api/emergency/send      - Send SOS alert
GET    /api/emergency/history   - Get emergency history
GET    /api/emergency/status    - Get emergency status
```

**Trip Routes** (`trip_routes.py`)
```
POST   /api/trips            - Create trip
GET    /api/trips            - Get all trips
GET    /api/trips/{id}       - Get specific trip
DELETE /api/trips/{id}       - Delete trip
```

**Family Routes** (`family_routes.py`)
```
POST   /api/family/members   - Add family member
GET    /api/family/members   - Get family members
DELETE /api/family/{id}      - Delete family member
```

#### **Database Layer** (`database.py`)
- **MongoDB Driver**: Motor (async, non-blocking)
- **Connection**: AsyncIOMotorClient
- **Database**: `silver_saheli`
- **Collections**: users, contacts, emergencies, trips, family_members

**Initialization:**
```python
async def init_db():
    # Connect to MongoDB
    # Create collections
    # Create indexes for performance
    # Load database instance
```

#### **Data Models** (`models.py`)
Pydantic models for MongoDB documents:

```python
class User(BaseModel):
    name: str
    email: str
    phone: str
    password_hash: str
    created_at: datetime

class Contact(BaseModel):
    name: str
    phone: str
    message: str
    created_at: datetime

class Emergency(BaseModel):
    user_id: ObjectId
    location: str
    timestamp: datetime
    status: str
    contacts_notified: list

class Trip(BaseModel):
    user_id: ObjectId
    destination: str
    start_date: datetime
    end_date: datetime
    details: str
    shared_with: list

class FamilyMember(BaseModel):
    user_id: ObjectId
    name: str
    phone: str
    relationship: str
    added_date: datetime
```

#### **Validation Schemas** (`schemas.py`)
Pydantic validators for API inputs:

```python
# Phone validation
@field_validator('phone')
def validate_phone(cls, v):
    if not re.match(r'^[+]?[\d\s-()]{10,15}$', v):
        raise ValueError('Invalid phone number')
    return v

# Email validation
@field_validator('email')
def validate_email(cls, v):
    # RFC 5322 validation
    return v

# Name validation (letters and spaces only)
@field_validator('name')
def validate_name(cls, v):
    if not re.match(r'^[a-zA-Z\s]+$', v):
        raise ValueError('Name must contain only letters and spaces')
    return v

# Date validation (YYYY-MM-DD)
@field_validator('date')
def validate_date(cls, v):
    # Ensure proper datetime format
    return v
```

#### **Security** (`security.py`)
```python
# Password hashing
def hash_password(password: str) -> str:
    return bcrypt.hash(password)

def verify_password(password: str, hash: str) -> bool:
    return bcrypt.verify(password, hash)

# JWT token operations
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    # Encode JWT with HS256, 30-min expiry
    
def decode_token(token: str) -> dict:
    # Decode and verify JWT
```

#### **Twilio Integration** (`twilio_service.py`)
```python
async def send_sms_alert(phone: str, message: str):
    # Send SMS via Twilio

async def send_whatsapp_alert(phone: str, message: str):
    # Send WhatsApp via Twilio

async def send_emergency_to_contacts(emergency: Emergency, contacts: list):
    # Send alerts to all emergency contacts
```

#### **Database Optimization** (`db_optimization.py`)
```python
# Create indexes for better query performance
- users.email (unique index)
- emergencies.user_id
- emergencies.timestamp
- trips.user_id
- family_members.user_id
- TTL indexes for temporary data
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register
  - Register new user
  - Input: name, email, password, phone
  - Output: success message, user_id

POST   /api/auth/login
  - Authenticate user
  - Input: email, password
  - Output: JWT token, user info

GET    /api/auth/me
  - Get authenticated user profile
  - Headers: Authorization: Bearer <token>
  - Output: User details

POST   /api/auth/logout
  - Logout user
  - Output: success message
```

### Contacts
```
POST   /api/contacts
  - Submit contact form
  - Input: name, phone, message
  - Output: contact_id, success

GET    /api/contacts
  - Get all contacts (admin only)
  - Output: array of contacts

GET    /api/contacts/{id}
  - Get specific contact
  - Output: contact details

DELETE /api/contacts/{id}
  - Delete contact
  - Output: success message
```

### Emergency
```
POST   /api/emergency/send
  - Send SOS alert to family
  - Input: location
  - Output: emergency_id, notification status

GET    /api/emergency/history
  - Get user's emergency history
  - Headers: Authorization: Bearer <token>
  - Output: array of emergencies

GET    /api/emergency/status/{id}
  - Get emergency status
  - Output: emergency details, contact responses
```

### Trips
```
POST   /api/trips
  - Create trip plan
  - Input: destination, dates, details, shared_with
  - Output: trip_id, success

GET    /api/trips
  - Get user's trips
  - Output: array of trips

GET    /api/trips/{id}
  - Get specific trip
  - Output: trip details

DELETE /api/trips/{id}
  - Delete trip
  - Output: success message
```

### Family Members
```
POST   /api/family/members
  - Add family member
  - Input: name, phone, relationship
  - Output: member_id, success

GET    /api/family/members
  - Get all family members
  - Output: array of family members

DELETE /api/family/members/{id}
  - Remove family member
  - Output: success message
```

---

## ✨ Features Implemented

### ✅ Core Features
- [x] User authentication with JWT
- [x] Emergency SOS system
- [x] Family member management
- [x] Trip planning and sharing
- [x] Contact form system
- [x] User profiles
- [x] Real-time notifications

### ✅ Security Features
- [x] Password hashing (bcrypt)
- [x] JWT authentication
- [x] CORS protection
- [x] XSS prevention
- [x] Security headers (HSTS, CSP)
- [x] Input validation
- [x] Rate limiting (optional)
- [x] HTTPS support

### ✅ Frontend Features
- [x] Responsive design
- [x] Mobile optimization
- [x] Dark/Light theme
- [x] Form validation
- [x] Real-time updates
- [x] Offline support

### ✅ Backend Features
- [x] Async database operations
- [x] RESTful API
- [x] Automatic API documentation
- [x] Database indexing
- [x] Error handling
- [x] Request logging
- [x] 25+ test cases

### ✅ Deployment Features
- [x] Docker containerization
- [x] Docker Compose setup
- [x] Heroku deployment
- [x] AWS EC2 support
- [x] Environment configuration
- [x] Production-ready setup

---

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 14+
- MongoDB 5.0+
- Git
- pip/npm

### Backend Setup

**1. Clone Repository**
```bash
git clone https://github.com/palakchopra013/Silver-Saheli.git
cd Silver-Saheli/backend
```

**2. Create Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**3. Install Dependencies**
```bash
pip install -r requirements.txt
```

**4. Configure Environment**
```bash
cp .env.example .env
# Edit .env with your configuration:
# - MONGODB_URI
# - TWILIO_ACCOUNT_SID
# - TWILIO_AUTH_TOKEN
# - SECRET_KEY
```

**5. Start MongoDB**
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Docker MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**6. Run Server**
```bash
uvicorn main:app --reload --port 5050
```

Server runs at: `http://localhost:5050`
API Docs: `http://localhost:5050/docs`

### Frontend Setup (React)

**1. Navigate to React App**
```bash
cd react_app
```

**2. Install Dependencies**
```bash
npm install
```

**3. Start Development Server**
```bash
npm start
```

Frontend runs at: `http://localhost:3000`

### Frontend Setup (HTML)

**1. Navigate to Frontend**
```bash
cd frontend
```

**2. Run Local Server**
```bash
# Using Python
python -m http.server 8000

# Using Node (with http-server)
npx http-server
```

Frontend runs at: `http://localhost:8000`

---

## 🚀 Running the Project

### Full Stack Development

**Terminal 1 - Backend**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 5050
```

**Terminal 2 - React Frontend**
```bash
cd react_app
npm start
```

**Terminal 3 - MongoDB (if running locally)**
```bash
mongod
```

### Access Points
- Frontend (React): `http://localhost:3000`
- Frontend (HTML): `http://localhost:8000`
- Backend: `http://localhost:5050`
- API Docs: `http://localhost:5050/docs`

### Running Tests
```bash
cd backend
source venv/bin/activate
pytest tests.py -v
```

---

## 📦 Deployment

### Docker Deployment

**Build & Run**
```bash
docker-compose up --build
```

**Services Started:**
- FastAPI Backend: `http://localhost:5050`
- React Frontend: `http://localhost:3000`
- MongoDB: `mongodb://mongodb:27017`
- Redis (optional): `redis://redis:6379`

### Heroku Deployment

**1. Prepare**
```bash
cd backend
heroku login
heroku create silver-saheli-backend
```

**2. Deploy**
```bash
git push heroku main
```

**3. Configure Environment**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set TWILIO_ACCOUNT_SID=your_twilio_sid
heroku config:set SECRET_KEY=your_secret_key
```

### AWS EC2 Deployment

**1. Launch EC2 Instance** (Ubuntu 20.04)

**2. Install Dependencies**
```bash
sudo apt update
sudo apt install python3.9 python3-pip mongodb-org nginx -y
```

**3. Clone & Setup**
```bash
git clone https://github.com/palakchopra013/Silver-Saheli.git
cd Silver-Saheli/backend
pip install -r requirements.txt
```

**4. Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:5050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**5. Run with Gunicorn**
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:5050
```

---

## 🗄️ Database Schema

### MongoDB Collections

**users**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password_hash: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

**contacts**
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  message: String,
  created_at: DateTime
}
```

**emergencies**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  location: String,
  timestamp: DateTime,
  status: String (pending|sent|confirmed),
  contacts_notified: Array<ObjectId>,
  created_at: DateTime
}
```

**trips**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  destination: String,
  start_date: DateTime,
  end_date: DateTime,
  details: String,
  shared_with: Array<ObjectId>,
  created_at: DateTime,
  updated_at: DateTime
}
```

**family_members**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: users),
  name: String,
  phone: String,
  email: String,
  relationship: String (parent|sibling|friend|spouse|etc),
  added_date: DateTime
}
```

### Indexes Created
- `users.email` (unique)
- `contacts.created_at`
- `emergencies.user_id`
- `emergencies.timestamp`
- `trips.user_id`
- `family_members.user_id`

---

## 🔐 Environment Variables

Create `.env` file in backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/silver_saheli
MONGODB_DB=silver_saheli

# JWT
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# CORS
CORS_ORIGINS=["http://localhost:3000", "http://localhost:8000"]

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Environment
ENVIRONMENT=development
```

---

## 📊 API Response Format

All responses follow a standard JSON format:

**Success Response (2xx)**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

**Error Response (4xx, 5xx)**
```json
{
  "success": false,
  "error": "Error code",
  "message": "Error description",
  "details": {}
}
```

**Status Codes**
- `200 OK` - Successful GET/POST
- `201 Created` - Resource created
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🧪 Testing

**Run All Tests**
```bash
pytest tests.py -v
```

**Run Specific Test Class**
```bash
pytest tests.py::TestAuthenticationRoutes -v
```

**Run with Coverage**
```bash
pytest tests.py --cov=. --cov-report=html
```

**Test Coverage Includes:**
- Authentication (register, login, JWT)
- User profile management
- Contact form submission
- Emergency alert system
- Trip management
- Family member operations
- Security headers
- Input validation
- Error handling

---

## 📝 License

This project is open-source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- **GitHub Issues**: [Silver-Saheli Issues](https://github.com/palakchopra013/Silver-Saheli/issues)
- **Email**: support@silversaheli.app
- **Website**: www.silversaheli.app

---

## 🎉 Conclusion

**Silver Saheli** is a production-ready women safety application with modern architecture, comprehensive features, and enterprise-grade security. It's designed to empower women and provide peace of mind to families through reliable emergency response and safety coordination.

**Status**: ✅ Complete & Production-Ready
**Last Updated**: February 2, 2026

---

*Made with ❤️ for women's safety and empowerment*
