/* =====================================================
   Silver Saheli - Main JS (ES Module)
   Loads UI, Services, Page-Specific JS automatically
===================================================== */

// ================= IMPORTS =================
import { initializeNavbar } from './ui/navbar.js';
import { initTheme } from './ui/theme.js';
import { formatDate, formatCurrency } from '../utils/helpers.js';
import { isValidEmail, isValidPhone } from '../utils/validate.js';

import * as API from './services/api.js';
import * as Auth from './services/auth.js';
import * as Location from './services/location.js';
import * as Reminders from './services/reminders.js';

// ================= GLOBAL INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize UI
    initializeNavbar();
    loadTheme();

    // 2. Optional theme toggle button
    const themeBtn = document.querySelector(".theme-toggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    // 3. Check if user is logged in
    checkUserLogin();

    // 4. Auto-load page-specific JS
    loadPageScript();
});

// ================= AUTH CHECK =================
function checkUserLogin() {
    const user = localStorage.getItem("saheliUser");
    if (!user) {
        console.log("User not logged in — browsing as guest");
        return;
    }

    try {
        const userObj = JSON.parse(user);
        console.log("Logged in as:", userObj.name || userObj.email || "unknown");
    } catch (e) {
        console.warn("saheliUser in localStorage is malformed:", e);
    }
}

// ================= PAGE-SPECIFIC JS LOADER =================
function loadPageScript() {
    const page = document.body?.dataset?.page;
    if (!page) return;

    const scriptPath = `./js/pages/${page}.js`;
    const script = document.createElement("script");
    script.type = "module";
    script.src = scriptPath;

    script.onload = () => console.log(`Loaded page script: ${scriptPath}`);
    script.onerror = () => console.warn(`Page script missing: ${scriptPath}`);

    document.body.appendChild(script);
}

// ================= UTILITY FUNCTIONS =================
export function notify(msg) {
    alert(msg);
}

export function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocal(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return null;
    }
}

export function removeFromLocal(key) {
    localStorage.removeItem(key);
}
