import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-section hero">
      <h1>Travel Freely. Safely. Together.</h1>

      <p className="hero-sub">
        Silver Saheli creates women-only travel experiences for senior women (60+),
        with medical support, verified companions, and real-time family tracking.
      </p>

      <div className="hero-actions">
        <button className="btn hero-primary" onClick={() => navigate("/trips")}>
          Explore Trips
        </button>
        <button className="btn secondary" onClick={() => navigate("/contact")}>
          Talk to Us
        </button>
      </div>

      <div className="trust-grid">
        <div className="trust-card">👩‍⚕️ On-trip Medical Support</div>
        <div className="trust-card">🧭 Verified Women Companions</div>
        <div className="trust-card">📍 Live Family Tracking</div>
        <div className="trust-card">🚨 SOS Emergency System</div>
      </div>
    </div>
  );
}
