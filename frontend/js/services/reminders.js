export function setReminder(message, delayMs) {
    return setTimeout(() => {
        alert(`Reminder: ${message}`);
    }, delayMs);
}

export function clearReminder(timeoutId) {
    clearTimeout(timeoutId);
}

export function scheduleDailyReminder(message, hour, minute = 0) {
    const now = new Date();
    let next = new Date();
    next.setHours(hour, minute, 0, 0);

    if (next < now) {
        next.setDate(next.getDate() + 1); // schedule for next day
    }

    const delay = next - now;
    return setTimeout(() => {
        alert(`Daily Reminder: ${message}`);
        scheduleDailyReminder(message, hour, minute); // repeat daily
    }, delay);
}
