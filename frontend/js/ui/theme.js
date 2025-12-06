// ui/theme.js
export function initTheme() {
    const themeToggleBtn = document.getElementById("themeToggle");
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (body.classList.contains("dark-theme")) {
                body.classList.remove("dark-theme");
                body.classList.add("light-theme");
                localStorage.setItem("theme", "light-theme");
            } else {
                body.classList.remove("light-theme");
                body.classList.add("dark-theme");
                localStorage.setItem("theme", "dark-theme");
            }
        });
    }
}
