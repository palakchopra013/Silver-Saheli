const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

export async function postContact(payload){
  const res = await fetch(`${API_BASE}/api/contact`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return res.json();
}

// add more: registerUser, createBooking, sendSOS etc.
export default { postContact };
