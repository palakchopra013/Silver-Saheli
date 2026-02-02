const BASE_URL = "http://localhost:5050/api"; // FastAPI backend

/**
 * Fetch all trips
 */
export async function fetchTrips() {
    try {
        const response = await fetch(`${BASE_URL}/trips/all`);
        if (!response.ok) throw new Error("Failed to fetch trips");
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

/**
 * Submit contact form
 */
export async function postContactForm(data) {
    try {
        const response = await fetch(`${BASE_URL}/contacts/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to submit form");
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Get all contacts
 */
export async function getAllContacts() {
    try {
        const response = await fetch(`${BASE_URL}/contacts/all`);
        if (!response.ok) throw new Error("Failed to fetch contacts");
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

/**
 * Delete a contact
 */
export async function deleteContact(contactId) {
    try {
        const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete contact");
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Send emergency SOS alert
 */
export async function sendEmergencyAlert(data) {
    try {
        const response = await fetch(`${BASE_URL}/emergency/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to send emergency alert");
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Get all family members
 */
export async function getFamilyMembers() {
    try {
        const response = await fetch(`${BASE_URL}/family/all`);
        if (!response.ok) throw new Error("Failed to fetch family members");
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

/**
 * Add a family member
 */
export async function addFamilyMember(data) {
    try {
        const response = await fetch(`${BASE_URL}/family/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to add family member");
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Delete a family member
 */
export async function deleteFamilyMember(memberId) {
    try {
        const response = await fetch(`${BASE_URL}/family/${memberId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete family member");
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}
