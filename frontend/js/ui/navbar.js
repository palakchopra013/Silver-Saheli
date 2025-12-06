// ui/navbar.js

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.getAttribute("data-page");
    const navLinks = document.querySelectorAll("header nav a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href.includes(currentPage)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
