/* ======================================================
   Silver Saheli - Helpers
   General utility functions
====================================================== */

export function formatDate(dateStr) {
    // Converts YYYY-MM-DD to a more readable format: DD MMM YYYY
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-IN", options);
}

export function formatCurrency(amount, currency = "INR") {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(amount);
}

export function debounce(func, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

export function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
