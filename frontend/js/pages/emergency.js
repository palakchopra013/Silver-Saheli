// ===============================
// emergency.js - Emergency Page JS
// ===============================

// Import service modules
import * as API from './services/api.js';
import * as Auth from './services/auth.js';
import * as Location from './services/location.js';
import * as Reminders from './services/reminders.js';

document.addEventListener("DOMContentLoaded", () => {

    // ---------- Menu Highlighting ----------
    const currentPage = document.body.getAttribute("data-page");
    const activeLink = document.querySelector(`nav a[href="${currentPage}.html"]`);
    if (activeLink) activeLink.classList.add("active");

    // ---------- SOS Button ----------
    const sosBtn = document.querySelector(".btn.emergency");
    if (sosBtn) {
        sosBtn.addEventListener("click", async () => {
            if (!Auth.isLoggedIn()) {
                alert("Please log in to send an SOS alert.");
                return;
            }

            try {
                const coords = await Location.getCurrentPosition();
                await API.sendSOS({ latitude: coords.latitude, longitude: coords.longitude });
                alert("SOS alert sent! Your family and support team have been notified.");
            } catch (err) {
                console.error(err);
                alert("Failed to send SOS alert. Please try again.");
            }
        });
    }

    // ---------- Optional: Auto Reminders for Safety ----------
    try {
        Reminders.setReminder("Check safety status", new Date(Date.now() + 1800000)); // 30 min reminder
    } catch (err) {
        console.warn("Could not set safety reminder.", err);
    }

    // ---------- Optional: Display current location for emergency tracking ----------
    const showLocation = async () => {
        try {
            const coords = await Location.getCurrentPosition();
            console.log("Current Location for Emergency:", coords);
        } catch (err) {
            console.warn("Could not fetch current location.", err);
        }
    };

    showLocation();
});
