import { useState, useEffect } from "react";

export default function useLocationTracking(enabled = false){
  const [position, setPosition] = useState(null);
  useEffect(()=>{
    if(!enabled || !navigator.geolocation) return;
    const id = navigator.geolocation.watchPosition(
      pos => setPosition({lat: pos.coords.latitude, lon: pos.coords.longitude}),
      err => console.warn("geo err",err),
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [enabled]);

  return { position };
}
