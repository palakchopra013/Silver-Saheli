// ===============================
// trips.js - Trips Page JS
// ===============================

// Import service modules
import * as API from './services/api.js';
import * as Auth from './services/auth.js';
import * as Location from './services/location.js';
import * as Reminders from './services/reminders.js';

document.addEventListener("DOMContentLoaded", async () => {

    // ---------- Menu Highlighting ----------
    const currentPage = document.body.getAttribute("data-page");
    const activeLink = document.querySelector(`nav a[href="${currentPage}.html"]`);
    if (activeLink) activeLink.classList.add("active");

    // ---------- Load Trips Dynamically ----------
    const tripsContainer = document.querySelector(".trip-cards");
    if (tripsContainer) {
        try {
            const trips = await API.getUpcomingTrips();
            tripsContainer.innerHTML = trips.map(trip => `
                <div class="card">
                    <h3>${trip.title}</h3>
                    <p><strong>Date:</strong> ${trip.date}</p>
                    <p><strong>Price per Person:</strong> ₹${trip.price}</p>
                    <p><strong>What’s Included:</strong> ${trip.inclusions.join(", ")}</p>
                    <button class="btn bookBtn" data-tripid="${trip.id}">Join The Group</button>
                </div>
            `).join("");
        } catch (err) {
            tripsContainer.innerHTML = `<p style="color:red;">Unable to load trips. Please try again later.</p>`;
            console.error(err);
        }
    }

    // ---------- Book Trip Buttons ----------
    tripsContainer?.addEventListener("click", async (e) => {
        if (e.target.classList.contains("bookBtn")) {
            const tripId = e.target.dataset.tripid;

            if (!Auth.isLoggedIn()) {
                alert("Please log in to book a trip!");
                return;
            }

            try {
                const success = await API.bookTrip(tripId);
                if (success) {
                    alert("Booking successful! ✅");
                    // Optional: Set reminder for trip
                    Reminders.setReminder(`Trip Reminder: ${tripId}`, new Date(Date.now() + 3600000));
                } else {
                    alert("Booking failed. Please try again.");
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred during booking.");
            }
        }
    });

    // ---------- Optional: Track user location ----------
    if (Location.getCurrentPosition) {
        try {
            const coords = await Location.getCurrentPosition();
            console.log("User Location:", coords);
        } catch (err) {
            console.warn("Could not get user location.", err);
        }
    }
});
