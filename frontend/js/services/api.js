const BASE_URL = "https://api.silversaheli.com"; // Replace with your actual backend

export async function fetchTrips() {
    try {
        const response = await fetch(`${BASE_URL}/trips`);
        if (!response.ok) throw new Error("Failed to fetch trips");
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function postContactForm(data) {
    try {
        const response = await fetch(`${BASE_URL}/contact`, {
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
