# Frontend Integration Guide

This guide explains how the frontend has been updated to work with the FastAPI backend.

## 📝 Updated Files

### 1. HTML Frontend
**File**: `frontend/js/services/api.js`

**API Base URL**: `http://localhost:5050/api`

**Available Functions**:
```javascript
// Contact Management
export async function postContactForm(data)
export async function getAllContacts()
export async function deleteContact(contactId)

// Trip Management
export async function fetchTrips()

// Emergency SOS
export async function sendEmergencyAlert(data)

// Family Members
export async function getFamilyMembers()
export async function addFamilyMember(data)
export async function deleteFamilyMember(memberId)
```

**Example Usage**:
```javascript
import * as api from './services/api.js';

// Submit contact form
const result = await api.postContactForm({
  name: 'John',
  phone: '9876543210',
  message: 'Contact message'
});

// Send emergency alert
const alert = await api.sendEmergencyAlert({
  user_name: 'Priya',
  location: 'Delhi, India'
});
```

### 2. React Frontend
**File**: `react_app/src/utils/api.js`

**API Base URL**: `http://localhost:5050/api` (configurable via `REACT_APP_API` env var)

**Available Functions**:
```javascript
// Authentication
export async function registerUser(payload)
export async function loginUser(payload)
export async function getCurrentUser(token)

// Contact Management
export async function postContact(payload)
export async function getAllContacts()
export async function deleteContact(contactId)

// Trip Management
export async function getAllTrips()
export async function createTrip(payload)
export async function deleteTrip(tripId)

// Emergency
export async function sendEmergencyAlert(payload)

// Family
export async function getFamilyMembers()
export async function addFamilyMember(payload)
export async function deleteFamilyMember(memberId)
```

**Example React Component**:
```jsx
import { postContact, sendEmergencyAlert } from '../utils/api';
import { useAuth } from '../hooks/useAuth';

function EmergencyButton() {
  const { user } = useAuth();
  
  const handleEmergency = async () => {
    try {
      const response = await sendEmergencyAlert({
        user_name: user.name,
        location: 'Current Location'
      });
      alert(response.message);
    } catch (error) {
      console.error('Emergency alert failed:', error);
    }
  };
  
  return <button onClick={handleEmergency}>Send SOS</button>;
}
```

## 🔐 Authentication

### Login & Store Token
```javascript
// React
import api from './utils/api';

async function handleLogin(email, password) {
  try {
    const response = await api.loginUser({ email, password });
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// HTML
async function loginUser(email, password) {
  const response = await fetch('http://localhost:5050/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
    return data;
  }
}
```

### Use Token in Requests
```javascript
// Get stored token
const token = localStorage.getItem('token');

// Include in request headers
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Example
const response = await fetch('http://localhost:5050/api/emergency/send', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ user_name: 'Priya', location: 'Delhi' })
});
```

## 🚀 API Base URL Configuration

### React App
Set environment variable:
```bash
# .env file in react_app directory
REACT_APP_API=http://localhost:5050/api
```

Or in production:
```bash
REACT_APP_API=https://your-domain.com/api
```

### HTML Frontend
The base URL is hardcoded in `api.js`:
```javascript
const BASE_URL = "http://localhost:5050/api";
```

Change to production URL when deploying.

## 📋 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* actual data */ }
}
```

### Error Response
```json
{
  "detail": "Error message here"
}
```

### Authentication Error (401)
```json
{
  "detail": "Invalid or expired token"
}
```

### Validation Error (422)
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

## 🧪 Testing API Integration

### Test with Curl
```bash
# Register
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'

# Login
curl -X POST http://localhost:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Submit contact
curl -X POST http://localhost:5050/api/contacts/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "phone": "9876543210",
    "message": "Test"
  }'
```

## 🔄 Migration from Express to FastAPI

### Key Differences
| Feature | Express | FastAPI |
|---------|---------|---------|
| Base URL | `/` | `/api/` |
| Contact submit | `POST /contact` | `POST /api/contacts/submit` |
| Contact list | `GET /contacts` | `GET /api/contacts/all` |
| Trip list | `GET /trips` | `GET /api/trips/all` |
| Emergency | `POST /emergency` | `POST /api/emergency/send` |
| Auth | None | Full JWT system |

## ⚙️ CORS Configuration

The backend allows requests from:
- http://localhost:3000 (React default)
- http://localhost:5173 (Vite default)
- http://localhost:8000
- http://127.0.0.1:5050

To add more origins, update `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,your-domain.com
```

## 🐛 Debugging Tips

### Check API Response
```javascript
const response = await fetch('http://localhost:5050/api/health');
const data = await response.json();
console.log(response.status, data);
```

### Check Token Validity
```javascript
const token = localStorage.getItem('token');
console.log('Token:', token);

// Decode token (on frontend)
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token expires:', new Date(payload.exp * 1000));
```

### View Server Logs
```bash
# Terminal where server is running
# Look for log messages with request details
GET /api/health | Client: 127.0.0.1
Response: 200
```

## 📱 Environment Variables

### React App (.env)
```env
REACT_APP_API=http://localhost:5050/api
REACT_APP_ENV=development
```

### HTML Frontend (api.js)
Edit the `BASE_URL` constant directly in the file.

## ✅ Integration Checklist

- [ ] Both frontend files updated (`api.js` in both directories)
- [ ] API base URL points to `http://localhost:5050/api`
- [ ] Backend server is running (`uvicorn main:app --reload`)
- [ ] MongoDB is running
- [ ] Test API endpoints with Swagger UI (`/docs`)
- [ ] Frontend can successfully call API endpoints
- [ ] Error handling works properly
- [ ] Authentication flow works (login → store token → use in requests)
- [ ] CORS is configured correctly
- [ ] Environment variables are set in production

## 🚀 Next Steps

1. **Test the integration**:
   ```bash
   # Run backend
   cd backend
   uvicorn main:app --reload --port 5050
   
   # In another terminal, run frontend
   cd react_app
   npm start
   ```

2. **Visit frontend**: http://localhost:3000 (React) or open `index.html` (HTML)

3. **Test endpoints**: Try registering, logging in, submitting a contact

4. **Check API docs**: Visit http://localhost:5050/docs for interactive documentation

5. **Deploy to production**: Follow deployment guide in `API_DOCUMENTATION.md`

---

For more details, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
