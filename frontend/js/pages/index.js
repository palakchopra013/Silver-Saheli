// ===============================
// index.js - Home Page JS
// ===============================

// Import service modules (ES6 style)
import * as API from './services/api.js';
import * as Auth from './services/auth.js';
import * as Location from './services/location.js';
import * as Reminders from './services/reminders.js';

document.addEventListener("DOMContentLoaded", async () => {

    // ---------- Menu Highlighting ----------
    const currentPage = document.body.getAttribute("data-page");
    const activeLink = document.querySelector(`nav a[href="${currentPage}.html"]`);
    if (activeLink) activeLink.classList.add("active");

    // ---------- Button Handlers ----------
    const exploreBtn = document.getElementById("exploreTrips");
    const bookBtn = document.getElementById("bookNow");
    const joinBtn = document.getElementById("joinCommunity");

    exploreBtn?.addEventListener("click", async () => {
        // Example: Fetch trips dynamically from API service
        const trips = await API.getUpcomingTrips();
        console.log("Upcoming trips:", trips);
        window.location.href = "trips.html";
    });

    bookBtn?.addEventListener("click", async () => {
        if (!Auth.isLoggedIn()) {
            alert("Please log in to book a trip!");
            return;
        }
        const bookingSuccess = await API.bookTrip("tripId123"); // Example trip ID
        if (bookingSuccess) {
            alert("Booking successful! 🚀");
        } else {
            alert("Booking failed. Try again later.");
        }
    });

    joinBtn?.addEventListener("click", async () => {
        const joined = await API.joinCommunity(Auth.getUserId());
        if (joined) {
            alert("Welcome to the Silver Saheli Community! 🌸");
        } else {
            alert("Could not join community. Try again later.");
        }
    });

    // ---------- Newsletter Form ----------
    const emailForm = document.getElementById("newsletterForm");
    emailForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("newsletterEmail");

        if (!emailInput || emailInput.value.trim() === "") {
            alert("Please enter a valid email.");
            return;
        }

        await API.subscribeNewsletter(emailInput.value);
        alert(`Thank you! Updates will be sent to: ${emailInput.value}`);
        emailInput.value = "";
    });

    // ---------- Safety Modal ----------
    const safetyBtn = document.getElementById("safetyInfoBtn");
    const safetyModal = document.getElementById("safetyModal");
    const closeModal = document.getElementById("closeSafetyModal");

    safetyBtn?.addEventListener("click", () => {
        if (safetyModal) safetyModal.style.display = "flex";
    });

    closeModal?.addEventListener("click", () => {
        if (safetyModal) safetyModal.style.display = "none";
    });

    // ---------- Optional: Track user location ----------
    if (Location.getCurrentPosition) {
        const coords = await Location.getCurrentPosition();
        console.log("User Location:", coords);
    }

    // ---------- Optional: Set reminders ----------
    if (Reminders.setReminder) {
        Reminders.setReminder("Check-in with family", new Date(Date.now() + 3600000)); // 1 hour later
    }
});

// ---------- Smooth Scroll Function ----------
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}
