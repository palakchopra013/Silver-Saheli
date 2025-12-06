export function login(email, password) {
    // Mock login function; replace with real API
    if (email === "test@example.com" && password === "password") {
        localStorage.setItem("user", JSON.stringify({ email }));
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem("user");
}

export function getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}
