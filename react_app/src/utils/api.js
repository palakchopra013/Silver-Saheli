const API_BASE = process.env.REACT_APP_API || "http://localhost:5050/api";

/**
 * Submit contact form
 */
export async function postContact(payload) {
  const res = await fetch(`${API_BASE}/contacts/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/**
 * Get all contacts
 */
export async function getAllContacts() {
  const res = await fetch(`${API_BASE}/contacts/all`);
  return res.json();
}

/**
 * Delete a contact
 */
export async function deleteContact(contactId) {
  const res = await fetch(`${API_BASE}/contacts/${contactId}`, {
    method: "DELETE"
  });
  return res.json();
}

/**
 * Get all trips
 */
export async function getAllTrips() {
  const res = await fetch(`${API_BASE}/trips/all`);
  return res.json();
}

/**
 * Create a new trip
 */
export async function createTrip(payload) {
  const res = await fetch(`${API_BASE}/trips/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/**
 * Delete a trip
 */
export async function deleteTrip(tripId) {
  const res = await fetch(`${API_BASE}/trips/${tripId}`, {
    method: "DELETE"
  });
  return res.json();
}

/**
 * Send emergency SOS alert
 */
export async function sendEmergencyAlert(payload) {
  const res = await fetch(`${API_BASE}/emergency/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/**
 * Get all family members
 */
export async function getFamilyMembers() {
  const res = await fetch(`${API_BASE}/family/all`);
  return res.json();
}

/**
 * Add a family member
 */
export async function addFamilyMember(payload) {
  const res = await fetch(`${API_BASE}/family/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/**
 * Delete a family member
 */
export async function deleteFamilyMember(memberId) {
  const res = await fetch(`${API_BASE}/family/${memberId}`, {
    method: "DELETE"
  });
  return res.json();
}

export default {
  postContact,
  getAllContacts,
  deleteContact,
  getAllTrips,
  createTrip,
  deleteTrip,
  sendEmergencyAlert,
  getFamilyMembers,
  addFamilyMember,
  deleteFamilyMember
};
