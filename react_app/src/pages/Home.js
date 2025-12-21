import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="page-section">
      {/* HERO */}
      <div className="hero">
        <h1>Silver Saheli 🌸</h1>
        <h2>Safe & Joyful Travel for Senior Women</h2>
        <p>
          A trusted women-only travel companion platform for senior citizens (60+),
          combining comfort, safety, medical support, and companionship.
        </p>

        <div className="hero-actions">
          <button className="btn hero-primary" onClick={() => navigate("/trips")}>
            Explore Trips
          </button>
          <button className="btn secondary" onClick={() => navigate("/contact")}>
            Talk to Us
          </button>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="grid" style={{ marginTop: 40 }}>
        <div className="card">
          <h3>👵 Senior-Friendly</h3>
          <p>Slow-paced itineraries, comfortable stays, and healthy meals.</p>
        </div>

        <div className="card">
          <h3>👩‍⚕️ Medical Support</h3>
          <p>On-call doctors, emergency kits, and health monitoring.</p>
        </div>

        <div className="card">
          <h3>👨‍👩‍👧 Family Connected</h3>
          <p>Live updates and emergency alerts for family members.</p>
        </div>

        <div className="card">
          <h3>🛡️ Verified Staff</h3>
          <p>Background-checked female guides and coordinators.</p>
        </div>
      </div>
    </section>
  );
}
