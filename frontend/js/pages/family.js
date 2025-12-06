// ===============================
// family.js - Family Page JS
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

    // ---------- Family Live Location Tracking ----------
    const liveLocationBtn = document.getElementById("viewLiveMap");
    if (liveLocationBtn) {
        liveLocationBtn.addEventListener("click", async () => {
            if (!Auth.isLoggedIn()) {
                alert("Please log in to view live location.");
                return;
            }

            try {
                const familyLocations = await API.getFamilyLocations();
                // For demo purposes, log to console; in production, integrate a map
                console.table(familyLocations);
                alert("Family locations fetched! Check console for coordinates.");
            } catch (err) {
                console.error(err);
                alert("Unable to fetch family locations.");
            }
        });
    }

    // ---------- Safety Alerts & Check-ins ----------
    const notificationsBtn = document.getElementById("enableNotifications");
    if (notificationsBtn) {
        notificationsBtn.addEventListener("click", async () => {
            if (!Auth.isLoggedIn()) {
                alert("Please log in to enable notifications.");
                return;
            }

            try {
                await API.enableSafetyNotifications();
                alert("Safety notifications enabled! You will receive updates automatically.");
            } catch (err) {
                console.error(err);
                alert("Failed to enable notifications.");
            }
        });
    }

    // ---------- Group Info ----------
    const groupInfoBtn = document.getElementById("viewGroupInfo");
    if (groupInfoBtn) {
        groupInfoBtn.addEventListener("click", async () => {
            if (!Auth.isLoggedIn()) {
                alert("Please log in to view group info.");
                return;
            }

            try {
                const groupData = await API.getGroupInfo();
                console.log("Group Info:", groupData);
                alert("Group info fetched! Check console for details.");
            } catch (err) {
                console.error(err);
                alert("Unable to fetch group information.");
            }
        });
    }

    // ---------- Call or Chat Anytime ----------
    const contactBtn = document.getElementById("openContactPanel");
    if (contactBtn) {
        contactBtn.addEventListener("click", () => {
            alert("Contact panel will open soon. Stay connected with your family!");
        });
    }

    // ---------- Optional: Track current user's location ----------
    if (Location.getCurrentPosition) {
        try {
            const coords = await Location.getCurrentPosition();
            console.log("Your Location:", coords);
        } catch (err) {
            console.warn("Could not get current location.", err);
        }
    }

    // ---------- Optional: Set Reminder for Family Updates ----------
    try {
        Reminders.setReminder("Check family updates", new Date(Date.now() + 3600000));
    } catch (err) {
        console.warn("Could not set reminder.", err);
    }
});
