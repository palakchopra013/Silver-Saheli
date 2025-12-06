/* ======================================================
   Silver Saheli - Validation Utilities
====================================================== */

export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

export function isValidPhone(phone) {
    const regex = /^[6-9]\d{9}$/; // Indian 10-digit mobile
    return regex.test(phone.trim());
}

export function isNonEmptyString(str) {
    return typeof str === "string" && str.trim().length > 0;
}

export function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

export function isFutureDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    return date.getTime() > now.getTime();
}
