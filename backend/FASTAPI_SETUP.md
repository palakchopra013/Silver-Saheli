# Silver Saheli Backend - FastAPI Version

FastAPI-based backend for Silver Saheli women safety application.

## Setup Instructions

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```
MONGO_URI=mongodb://localhost:27017/silver_saheli
PORT=5050
```

### 3. Run the Server

**Development Mode** (with auto-reload):
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 5050
```

**Production Mode**:
```bash
uvicorn main:app --host 0.0.0.0 --port 5050
```

## API Documentation

Once the server is running, access the interactive API docs:
- **Swagger UI**: http://localhost:5050/docs
- **ReDoc**: http://localhost:5050/redoc

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── database.py             # Database configuration and session management
├── models.py               # SQLAlchemy ORM models
├── schemas.py              # Pydantic request/response schemas
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (create this)
└── routes/
    ├── __init__.py
    ├── contact_routes.py   # Contact form endpoints
    ├── emergency_routes.py # Emergency alert endpoints
    ├── trip_routes.py      # Trip management endpoints
    └── family_routes.py    # Family member endpoints
```

## Tech Stack

- **FastAPI** - Modern async Python web framework
- **SQLAlchemy** - SQL/ORM toolkit with async support
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation using Python type hints
- **Uvicorn** - ASGI web server
- **MongoDB** - NoSQL database

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Contacts
- `POST /api/contacts/submit` - Submit contact form
- `GET /api/contacts/all` - Get all contacts
- `GET /api/contacts/{contact_id}` - Get specific contact
- `DELETE /api/contacts/{contact_id}` - Delete contact

### Emergency
- `POST /api/emergency/send` - Send emergency SOS alert

### Trips
- `POST /api/trips/create` - Create new trip
- `GET /api/trips/all` - Get all trips
- `GET /api/trips/{trip_id}` - Get specific trip
- `DELETE /api/trips/{trip_id}` - Delete trip

### Family
- `POST /api/family/add` - Add family member
- `GET /api/family/all` - Get all family members
- `DELETE /api/family/{member_id}` - Delete family member

## Migration from Express.js to FastAPI

### Key Differences:
1. **Async/Await**: FastAPI uses async by default for better performance
2. **Type Hints**: Uses Pydantic models for validation instead of manual checks
3. **ORM**: Switched from Mongoose to SQLAlchemy with MongoDB support
4. **API Documentation**: Automatic interactive API docs with Swagger UI
5. **Error Handling**: Uses HTTPException instead of res.status()
6. **Middleware**: CORS middleware configuration is simpler

## Next Steps

1. Test all endpoints with the API documentation
2. Implement Trip and Family models (currently TODO)
3. Add authentication/authorization if needed
4. Integrate SMS/WhatsApp for emergency alerts
5. Add request logging and error tracking
