export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation not supported");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => reject(err)
            );
        }
    });
}

export function trackLocation(callback, interval = 5000) {
    const watchId = setInterval(async () => {
        try {
            const location = await getCurrentLocation();
            callback(location);
        } catch (err) {
            console.error("Location tracking error:", err);
        }
    }, interval);

    return () => clearInterval(watchId); // stop tracking
}
