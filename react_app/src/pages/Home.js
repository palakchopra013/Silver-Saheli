import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="page-section">
      {/* HERO */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>
          Travel Freely. Safely. Together.
        </h1>

        <p style={{ fontSize: "1.1rem", maxWidth: 700 }}>
          <strong>Silver Saheli</strong> is India’s first women-only travel
          platform designed exclusively for senior women (60+).
          Travel with dignity, safety, medical care, and complete family peace of mind.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
          <button
            className="btn"
            onClick={() => navigate("/trips")}
          >
            View Upcoming Trips
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/contact")}
          >
            Talk to Us
          </button>
        </div>
      </div>

      {/* TRUST HIGHLIGHTS */}
      <div className="grid" style={{ marginBottom: 40 }}>
        <div className="card">
          <h3>👩‍👩‍👧 Women-Only Groups</h3>
          <p>
            Travel only with women of your age group, accompanied by trained
            female coordinators.
          </p>
        </div>

        <div className="card">
          <h3>🩺 Medical Support</h3>
          <p>
            On-trip medical assistance, emergency protocols, and health-friendly
            itineraries.
          </p>
        </div>

        <div className="card">
          <h3>📍 Family Live Tracking</h3>
          <p>
            Your family can track your journey in real-time and stay connected
            throughout the trip.
          </p>
        </div>
      </div>

      {/* WHY SILVER SAHELI */}
      <div style={{ marginBottom: 40 }}>
        <h2>Why Thousands of Families Trust Silver Saheli</h2>

        <ul style={{ fontSize: "1rem", lineHeight: 1.8 }}>
          <li>✔ Carefully curated slow-paced itineraries</li>
          <li>✔ Safe hotels, hygienic food & verified transport</li>
          <li>✔ Emergency SOS & 24/7 support team</li>
          <li>✔ Respectful environment for senior women</li>
        </ul>
      </div>

      {/* EMOTIONAL CONNECT */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg,#fde2ec,#f9d1e3)",
          borderLeft: "6px solid var(--accent)",
        }}
      >
        <h2>For Every Mother Who Dreamed of Travelling Again</h2>
        <p style={{ fontSize: "1.05rem" }}>
          Many women spend their lives caring for others.
          Silver Saheli is about giving them the confidence to explore again —
          without fear, without burden, and with complete support.
        </p>

        <button
          className="btn"
          style={{ marginTop: 16 }}
          onClick={() => navigate("/family")}
        >
          How Families Stay Connected
        </button>
      </div>
    </section>
  );
}
