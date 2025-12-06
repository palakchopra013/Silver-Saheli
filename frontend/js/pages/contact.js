// ===============================
// contact.js - Contact Page JS
// ===============================

// Import service modules
import * as API from './services/api.js';
import * as Auth from './services/auth.js';
import * as Location from '../services/location.js';
import * as Reminders from './services/reminders.js';

document.addEventListener("DOMContentLoaded", () => {

    // ---------- Menu Highlighting ----------
    const currentPage = document.body.getAttribute("data-page");
    const activeLink = document.querySelector(`nav a[href="${currentPage}.html"]`);
    if (activeLink) activeLink.classList.add("active");

    // ---------- Contact Form ----------
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields before submitting.");
                return;
            }

            if (!Auth.isLoggedIn()) {
                alert("Please log in to submit your query.");
                return;
            }

            try {
                await API.submitContactForm({ name, email, message });
                alert("Thank you! Your message has been sent successfully.");
                contactForm.reset();

                // Optional: set a reminder for follow-up
                Reminders.setReminder("Follow-up on contact form", new Date(Date.now() + 86400000)); // 24h
            } catch (err) {
                console.error("Contact form submission failed:", err);
                alert("Failed to send your message. Please try again later.");
            }
        });
    }
});
